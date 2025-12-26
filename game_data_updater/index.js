// from https://github.com/csfloat/cs-files/blob/master/index.js

import { createInterface } from 'readline/promises';

const SteamUser = require('steam-user');
const fs = require('fs');
const vpk = require('vpk');
const appId = 730;
const depotId = 2347770;
const dir = `./static`;
const temp = "./temp";
const manifestIdFile = 'manifestId.txt'

// use regex to match language filename
const langRegex = /^resource\/csgo_[a-z]+\.txt$/;
const itemsGameFile = 'scripts/items/items_game.txt';

async function downloadVPKDir(user, manifest) {
    const dirFile = manifest.manifest.files.find((file) => file.filename.endsWith("csgo\\pak01_dir.vpk"));

    console.log(`Downloading vpk dir`)

    await user.downloadFile(appId, depotId, dirFile, `${temp}/pak01_dir.vpk`);

    // Persist in static directory
    fs.copyFileSync(`${temp}/pak01_dir.vpk`, `${dir}/pak01_dir.vpk`);

    const vpkDir = new vpk(`${temp}/pak01_dir.vpk`);
    vpkDir.load();

    return vpkDir;
}

function getVPKFilePaths(vpkDir) {
    const paths = [itemsGameFile];

    // get language file paths
    for (const fileName of vpkDir.files) {
        if (langRegex.test(fileName)) {
            paths.push(fileName);
        }
    }

    return paths;
}

function getRequiredVPKFiles(vpkDir) {
    const paths = getVPKFilePaths(vpkDir);
    const requiredIndices = [];

    for (const fileName of vpkDir.files) {
        for (const f of paths) {
            if (fileName.startsWith(f)) {
                console.log(`Found vpk for ${f}: ${fileName}`)

                const archiveIndex = vpkDir.tree[fileName].archiveIndex;

                if (!requiredIndices.includes(archiveIndex)) {
                    requiredIndices.push(archiveIndex);
                }

                break;
            }
        }
    }

    return requiredIndices.sort();
}

async function downloadVPKArchives(user, manifest, vpkDir) {
    const requiredIndices = getRequiredVPKFiles(vpkDir);

    console.log(`Required VPK files ${requiredIndices}`);

    for (let i = 0; i < requiredIndices.length; i++) {
        const archiveIndex = requiredIndices[i];

        // pad to 3 zeroes
        const paddedIndex = '0'.repeat(3-archiveIndex.toString().length) + archiveIndex;
        const fileName = `pak01_${paddedIndex}.vpk`;

        const file = manifest.manifest.files.find((f) => f.filename.endsWith(fileName));
        const filePath = `${temp}/${fileName}`;

        const status = `[${i + 1}/${requiredIndices.length}]`;

        console.log(`${status} Downloading ${fileName}`);

        await user.downloadFile(appId, depotId, file, filePath);
    }
}

function trimBOM(buffer) {
    // Check if the Buffer starts with the BOM character
    if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        // Trim the first two bytes (BOM)
        return buffer.slice(3);
    } else {
        // No BOM, return the original Buffer
        return buffer;
    }
}

function extractVPKFiles(vpkDir) {
    console.log("Extracting vpk files")

    const filePaths = getVPKFilePaths(vpkDir);

    for (const targetPath of filePaths) {
        let found = false;

        for (const vpkPath of vpkDir.files) {
            if (vpkPath.startsWith(targetPath)) {
                console.log(`Extracting ${targetPath}: ${vpkPath}`);

                const file = vpkDir.getFile(vpkPath);
                const pathParts = targetPath.split('/');
                const fileName = pathParts[pathParts.length - 1];

                // Remove BOM from file (https://en.wikipedia.org/wiki/Byte_order_mark)
                // Convenience so down stream users don't have to worry about decoding with BOM
                const trimmedFile = trimBOM(file)

                try {
                    fs.writeFileSync(`${dir}/${fileName}`, trimmedFile)
                } catch (err) {
                    throw err;
                }

                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`could not find ${targetPath}`);
        }
    }
}

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

if (!fs.existsSync(temp)){
    fs.mkdirSync(temp);
}

const user = new SteamUser();

let rl = createInterface(process.stdin, process.stdout);

const username = await rl.question('Enter your Steam username: ');
const password = await rl.question('Enter your Steam password: ', { hideEchoBack: true });

console.log('Logging in...');

user.logOn({
    accountName: username,
    password: password,
    rememberPassword: true,
    logonID: 2121,
});

user.on('steamGuard', async function(domain, callback) {
	var code = await rl.question(`Steam Guard code for ${domain}: `);
	callback(code);
});

user.on('error', function(error) {
    console.log(error);
});

user.on('disconnected', function() {
    console.log('Disconnected');
});

user.once('loggedOn', async () => {
    const cs = (await user.getProductInfo([appId], [], true)).apps[appId].appinfo;
    const commonDepot = cs.depots[depotId];
    const latestManifestId = commonDepot.manifests.public.gid;

    console.log(`Obtained latest manifest ID: ${latestManifestId}`);

    let existingManifestId = "";

    try {
        existingManifestId = fs.readFileSync(`${dir}/${manifestIdFile}`, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    if (existingManifestId === latestManifestId) {
        console.log("Latest manifest Id matches existing manifest Id, exiting");
        process.exit(0);
    }

    console.log("Latest manifest Id does not match existing manifest Id, downloading game files")

    const manifest = await user.getManifest(appId, depotId, latestManifestId, 'public');

    const vpkDir = await downloadVPKDir(user, manifest);
    await downloadVPKArchives(user, manifest, vpkDir);
    extractVPKFiles(vpkDir);

    try {
        fs.writeFileSync(`${dir}/${manifestIdFile}`, latestManifestId);
    } catch (err) {
        throw err;
    }

    process.exit(0);
});
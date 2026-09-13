const fs = require('fs');
const glob = require('glob');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix href="/..." -> href={`${import.meta.env.BASE_URL}...`}
    // Skip if it's href="#" or href="http" or already using BASE_URL
    const hrefRegex = /href="\/([^"]*)"/g;
    if (hrefRegex.test(content)) {
        content = content.replace(hrefRegex, 'href={`${import.meta.env.BASE_URL}$1`}');
        changed = true;
    }

    // Fix src="/assets/..." -> src={`${import.meta.env.BASE_URL}assets/...`}
    const srcRegex = /src="\/assets\/([^"]*)"/g;
    if (srcRegex.test(content)) {
        content = content.replace(srcRegex, 'src={`${import.meta.env.BASE_URL}assets/$1`}');
        changed = true;
    }

    // Fix objects in Astro components (e.g., bg: '/assets/hero.jpg')
    const bgRegex = /bg: '\/assets\/([^']+)'/g;
    if (bgRegex.test(content)) {
        content = content.replace(bgRegex, 'bg: import.meta.env.BASE_URL + \'assets/$1\'');
        changed = true;
    }

    const imgRegex = /img(\d+): '\/assets\/([^']+)'/g;
    if (imgRegex.test(content)) {
        content = content.replace(imgRegex, 'img$1: import.meta.env.BASE_URL + \'assets/$2\'');
        changed = true;
    }

    if (changed) {
        // Double check for any double slashes just in case, but BASE_URL usually has a trailing slash.
        // If BASE_URL is "/barbershop_web/" and we do `${BASE_URL}bourbon`, it becomes "/barbershop_web/bourbon". 
        // Wait! import.meta.env.BASE_URL ALWAYS ends in a slash. 
        // So href="/bourbon" -> href={`${import.meta.env.BASE_URL}bourbon`} is perfect! (Removes the leading slash).
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

// Ensure glob is installed or use standard fs loops (standard fs is safer if glob not installed)
const filesToFix = [
    'src/pages/index.astro',
    'src/layouts/Layout.astro',
    'src/components/Header.astro',
    'src/components/Hero.astro',
    'src/components/Gallery.astro'
];

filesToFix.forEach(fixFile);

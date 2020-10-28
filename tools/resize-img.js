const fs = require('fs');
const resizeImg = require('resize-img');
const file = process.argv.slice(2)[0];

(async () => {
    const image = await resizeImg(fs.readFileSync(file), {
        width: 768,
    });

    fs.writeFileSync(file, image);
})();
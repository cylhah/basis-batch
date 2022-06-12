const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

export class FSUtils {
    static delDir(fromPath: string, isOrigion = true) {
        let files = [];
        if (fs.existsSync(fromPath)) {
            files = fs.readdirSync(fromPath);
            files.forEach((file: string, index: number) => {
                let curPath = path.resolve(fromPath, file);
                if (fs.statSync(curPath).isDirectory()) {
                    FSUtils.delDir(curPath, false); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });

            if (!isOrigion) {
                fs.rmdirSync(fromPath);
            }
        }
    }

    static hashFile(filePath: string) {
        let fileExt = path.extname(filePath);
        let fileName = path.basename(filePath, fileExt);

        let content = fs.readFileSync(filePath, { encoding: "utf-8" });
        let md5Hash = crypto.createHash("md5").update(content).digest("hex");
        let newName = fileName + "-" + md5Hash + fileExt;
        console.log("hashFile ", filePath, newName);
        this.renameFileToCurDir(filePath, newName);
        return newName;
    }

    static isPathExist(path: string) {
        return fs.existsSync(path);
    }

    static renameFileToCurDir(filePath: string, newName: string) {
        let dirPath = path.dirname(filePath);
        let newPath = path.resolve(dirPath, newName);
        fs.renameSync(filePath, newPath);
    }

    static renameFile(filePath: string, newPath: string) {
        fs.renameSync(filePath, newPath);
    }

    static writeFile(toPath: string, content: string) {
        let writeFlag = fs.existsSync(toPath) ? "w" : "a";
        fs.writeFileSync(toPath, content, { flag: writeFlag, encoding: "utf-8" });
    }

    //正则删除文件
    static delFiles(fromDir: string, reg: RegExp) {
        let paths = this.getDirPaths(fromDir);
        for (let i = 0; i < paths.length; i++) {
            let item = paths[i];
            if (item.match(reg)) {
                console.log("del file", item);
                fs.unlinkSync(path.resolve(fromDir, item));
            }
        }
    }

    //获取这级目录下的所有路径
    static getDirPaths(fromDir: string) {
        if (fs.existsSync(fromDir)) {
            let paths = fs.readdirSync(fromDir);
            return paths;
        } else {
            throw new Error("路径不存在");
        }
    }

    static mkdir(path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }

    static copyDir(from: string, to: string) {
        const fromPath = path.resolve(from);
        const toPath = path.resolve(to);
        try {
            fs.accessSync(toPath);
        } catch (err) {
            fs.mkdirSync(toPath);
        }
        let paths = fs.readdirSync(fromPath);

        paths.forEach(function (item: string) {
            const newFromPath = fromPath + "/" + item;
            const newToPath = path.resolve(toPath + "/" + item);

            let state = fs.statSync(newFromPath);

            if (state.isFile()) {
                FSUtils.copyFile(newFromPath, newToPath);
                // console.log(newToPath);
            }
            if (state.isDirectory()) {
                FSUtils.copyDir(newFromPath, newToPath);
            }
        });
    }

    //模糊查找某个文件
    static getFileFuzzy(fromDir: string, reg: RegExp) {
        let paths = this.getDirPaths(fromDir);
        for (let i = 0; i < paths.length; i++) {
            let item = paths[i];
            if (item.match(reg)) {
                console.log("match file path ", item);
                return path.resolve(fromDir, item);
            }
        }

        return null;
    }

    static copyFile(from: string, to: string) {
        fs.copyFileSync(from, to);
    }
}

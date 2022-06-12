import { exec } from "child_process";
import { FSUtils } from "../common/FSUtils";
import { StaticPathHandler } from "../common/static-path-handler";
import { sendLog } from "../event-handler";
import path from "path";

export function batchBasis(inputPath: string, outputPath: string) {
    let basisuExePath = StaticPathHandler.handleStaticPath("exe/basisu.exe");
    sendLog("batchBasis:" + __dirname + basisuExePath);
    // console.log("输入文件路径:", inputPath);
    // console.log("输出文件路径:", outputPath);

    if (!FSUtils.isPathExist(inputPath)) {
        // console.log("输入文件路径不存在，请检查路径");
    } else if (!FSUtils.isPathExist(outputPath)) {
        // console.log("输出文件路径不存在，请检查路径");
    } else {
        try {
            let paths = FSUtils.getDirPaths(inputPath);

            for (let i = 0; i < paths.length; i++) {
                let item = paths[i];
                let fullPath = path.resolve(inputPath, item);
                exec(`${basisuExePath} ${fullPath} -no_ktx -etc1_only -output_path ${outputPath}`);
                // sendLog(execRes.toString());
                // console.log(execRes.toString());
                // console.log("已转换文件:", fullPath);
                // console.log("输出到：", outputPath);
            }
        } catch (error) {
            console.log("发生错误");
            console.log(error);
            sendLog(error);
        }
    }
}

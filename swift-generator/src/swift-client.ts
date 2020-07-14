import { AstRoot } from "@sdkgen/parser";
import { generateClass, generateEnum } from "./helpers";

interface Options {}

export function generateSwiftClientSource(ast: AstRoot, options: Options) {
    let code: String = "";

    for (const type of ast.enumTypes) {
        code += generateEnum(type);
        code += "\n";
    }

    for (const type of ast.structTypes) {
        code += generateClass(type);
        code += "\n";
    }
}
import {
    ArrayType,
    Base64PrimitiveType,
    BigIntPrimitiveType,
    BoolPrimitiveType,
    BytesPrimitiveType,
    CnpjPrimitiveType,
    CpfPrimitiveType,
    DatePrimitiveType,
    DateTimePrimitiveType,
    EmailPrimitiveType,
    EnumType,
    FloatPrimitiveType,
    HexPrimitiveType,
    HtmlPrimitiveType,
    IntPrimitiveType,
    JsonPrimitiveType,
    MoneyPrimitiveType,
    OptionalType,
    StringPrimitiveType,
    StructType,
    Type,
    TypeReference,
    UIntPrimitiveType,
    UrlPrimitiveType,
    UuidPrimitiveType,
    VoidPrimitiveType,
    XmlPrimitiveType,
} from "@sdkgen/parser";

export function generateEnum(type: EnumType) {
    return `enum ${type.name} {\n  ${type.values.map(x => x.value).join(",\n  ")}\n}\n`;
}

export function generateClass(type: StructType) {
    return `class ${type.name} {\n  ${type.fields
        .map((field: any) => `${generateTypeName(field.type)} ${field.name};`)
        .join("\n  ")}\n\n${generateConstructor(type)}}\n`;
}

export function generateTypeName(type: Type): string {
    switch (type.constructor) {
        case StringPrimitiveType:
            return "String";
        case IntPrimitiveType:
            return "Int";
        case UIntPrimitiveType:
            return "UInt";
        case FloatPrimitiveType:
            return "Float";
        case BigIntPrimitiveType:
            return "Double";
        case DatePrimitiveType:
        case DateTimePrimitiveType:
            return "Date";
        case BoolPrimitiveType:
            return "Bool";
        case BytesPrimitiveType:
            return "UInt8";
        case MoneyPrimitiveType:
            return "int";
        case CpfPrimitiveType:
        case CnpjPrimitiveType:
        case EmailPrimitiveType:
        case HtmlPrimitiveType:
        case UrlPrimitiveType:
        case UuidPrimitiveType:
        case HexPrimitiveType:
        case Base64PrimitiveType:
        case XmlPrimitiveType:
            return "String";
        case VoidPrimitiveType:
            return "Void";
        case JsonPrimitiveType:
            return "[String: Any]";
        case OptionalType:
            return generateTypeName((type as OptionalType).base);
        case ArrayType:
            return `[${generateTypeName((type as ArrayType).base)}]`;
        case StructType:
            return type.name;
        case EnumType:
            return type.name;
        case TypeReference:
            return generateTypeName((type as TypeReference).type);
        default:
            throw new Error(`BUG: generateTypeName with ${type.constructor.name}`);
    }
}

function generateConstructor(type: StructType): string {
    const doubleSpace = "  ";
    const fourSpaces = "    ";
    var str = `${doubleSpace}init(`;

    type.fields.forEach((field: any) => {
        if (field.type instanceof OptionalType) {
            str = str.concat(fourSpaces);
        } else {
            str = str.concat(`${fourSpaces}`);
        }
        str = str.concat(`this.${field.name},\n`);
    });
    str = str.concat(`)\n`);
    return str;
}
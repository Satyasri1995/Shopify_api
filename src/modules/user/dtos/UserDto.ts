import { IsBoolean, IsEmail,IsMongoId,IsString, MaxLength, MinLength, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}

export class CreateUserDto{

    @IsEmail()
    mail:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('password',{message:'Password and confirmPassword does not match'})
    confirmPassword:string;

    @IsBoolean()
    isAdmin:boolean;

}

export class UserDto{
    
    @IsMongoId()
    id:string;

    @IsEmail()
    mail:string;

    @IsBoolean()
    isAdmin:boolean

}
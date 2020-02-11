import {ArgumentMetadata, BadRequestException, CallHandler, ExecutionContext, NestInterceptor, PipeTransform} from '@nestjs/common';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {PortalUser} from '../../../domain/entity/PortalUser';
import {LoginDto} from '../../../dto/auth/LoginDto';

export class ValidatorInterceptor implements PipeTransform<any> {

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const classObject = plainToClass(metadata.metatype, value);
        const validationErrors = await validate(classObject);
        if (validationErrors.length > 0) {
            throw new BadRequestException(this.createValidationMessage(validationErrors[0]));
        }

        return value;

    }

    private createValidationMessage(validationError: ValidationError) {
        // tslint:disable-next-line:one-variable-per-declaration
        const property = validationError.property, constraints: { [p: string]: string } = validationError.constraints;
        return {
            'property-name': property,
            'errors': Object.values(constraints)
        };
        // tslint:disable-next-line:no-console

    }
}


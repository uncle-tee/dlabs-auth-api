import {SetMetadata} from '@nestjs/common';
import {RequestInterceptor} from '../RequestInterceptor';
import {AccessType} from '../accessTypes/AccessType';

export const Public = () => SetMetadata(AccessType.PUBLIC, AccessType.PUBLIC);

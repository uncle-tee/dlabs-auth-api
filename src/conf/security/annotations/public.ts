import {SetMetadata} from '@nestjs/common';
import {AppInterceptor} from '../interceptors/AppInterceptor';
import {AccessType} from '../accessTypes/AccessType';

export const Public = () => SetMetadata(AccessType.PUBLIC, AccessType.PUBLIC);

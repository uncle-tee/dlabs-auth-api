import {createParamDecorator} from '@nestjs/common';

export const RequestPrincipal = createParamDecorator((data, req) => {
    return req.requestPrincipal;
});

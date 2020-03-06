import {createParamDecorator} from '@nestjs/common';

export const AppContext = createParamDecorator((data, req) => {
    return req.app;
});

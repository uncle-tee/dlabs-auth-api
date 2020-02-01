import {createParamDecorator} from '@nestjs/common';

export const App = createParamDecorator((data, req) => {
    return req.body.app;
});

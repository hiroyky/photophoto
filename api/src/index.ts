import * as env from '~/config/env';
import app from './server';

app.listen(env.PORT, () => {
    console.log(`Listen on port ${env.PORT}`);
});

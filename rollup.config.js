import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import css from 'rollup-plugin-css-only';
import reactjsx from '@babel/plugin-transform-react-jsx';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        css({ output: 'videoplayer.css' }),
        external(),
        babel({
            exclude: 'node_modules/**'
        }),
        del({ targets: ['dist/*'] }),
        //reactjsx(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
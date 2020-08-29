
import App from './app';

export default() => App();

export const mount = (Сomponent) => {
    // console.log('Mounted');
    Сomponent();
};

export const unmount = () => {
    // console.log('Unmounting');
};

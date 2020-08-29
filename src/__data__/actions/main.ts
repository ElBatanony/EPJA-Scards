import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { authHeader } from '@main/__data__/helpers/auth-header';
import { getConfig } from '@ijl/cli';

const getFetchAction = () => ({
    // type: MAIN_DATA_FETCH,
});

const getSuccessAction = (data) => {
    // console.log(data);
    document.write('Images<br>');
    for (const img of data.mainData.imgArr) {
        document.write(img.alt + '<br>');
    }
};

const getErrorAction = () => ({
    // type: MAIN_DATA_FETCH_FAIL,
});

const getData = async () => {
    // console.log('Starting Data Actions');
    getFetchAction();

    const requestProps: AxiosRequestConfig = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        }
    };
    const mainApiBaseUrl = getConfig()['main.api.base.url'];
    try {
        const answer: AxiosResponse = await axios(`${mainApiBaseUrl}/getMainData`, requestProps);

        if (answer.data?.status?.code === 0) {
            getSuccessAction(answer.data);
        } else {
            getErrorAction();
        }

    } catch (error) {
        console.error('Axios Error', error);
        getErrorAction();
    }
};

export default getData;
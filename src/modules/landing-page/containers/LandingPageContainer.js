import React, {useState} from 'react';

import UploadButtonComponent from '../components/UploadButtonComponent';

const LandingPageContainer = () => {

    const [a, setA] = useState(0);

    const onClickUpload = (event) => {
        setA(a + 1);
    }

    return (
        <div>
            <h1>{a}</h1>
            <UploadButtonComponent onClick={onClickUpload}/>
        </div>

    );
};

export default LandingPageContainer;
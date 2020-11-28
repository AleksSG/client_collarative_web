const UploadButtonComponent = (props) => {

    return (
        <div>
            <input type="file" onChange={props.onChange} />
            <button onClick={props.onClick}>
                Upload
            </button>
        </div>
    );
};

export default UploadButtonComponent;
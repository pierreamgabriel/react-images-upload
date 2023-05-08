import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import './lib/bootstrap/bootstrap.min.css';
import './lib/icofont/icofont.min.css';
import './ImageUpload.css';

function ImageUpload() {

    const [imgList, setImgList] = useState({ 'images': [] });
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(false);
    const [change, setChange] = useState({
        'replace': false,
        'delete': false,
        'url': "",
        'index': "",
        'image': ""
    });

    const processImage = (e) => {

        if (e.target.files[0] == null) {
            return;
        }

        setProgress(true);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        axios.post('./upload.php', formData, {
        })
            .then(res => {
                if (!res.data.error) {
                    if (change.replace) {
                        const newArray = imgList.images;
                        newArray[change.index] = res.data.url;
                        setImgList({"images": newArray});
                        setChange({...change, 'replace': false});
                        setProgress(false);
                        setError(false);
                    } else {
                        setImgList({"images": [...imgList.images, res.data.url]});
                        setProgress(false);
                        setError(false);
                    }
                } else {
                    setProgress(false);
                    setError(true);
                    setChange({...change, 'replace': false});
                }

            });
    }

    const replaceImage = (index) => {
        setChange({...change, 'index': index});
        document.getElementById('add-product-replace-image').click();
    };

    useEffect(() => {

        if (change.delete) {
            if (imgList.images.length == 1) {
                setImgList({'images': []});
                setChange({...change, 'delete': false});
            } else {
                const newArray = imgList.images.filter(e => e !== change.url);
                setImgList({"images": newArray});
                setChange({...change, 'delete': false});
            }
        }

        if (change.replace) {
            processImage(change.image);
        }

    }, [change.delete, change.replace]);

    return (
        <div className="container-fluid" style={{ marginBottom: "1.5rem" }}>
            <div className="card-group">
                {imgList.images.map((img, index) => {
                    return (
                        <div className="card list-product-img-div" key={img}>
                            <span>
                                <i className="icofont-edit" style={{ marginRight: "5px" }}
                                    onClick={() => replaceImage(index)}></i>
                                <input type="file" id="add-product-replace-image" accept=".jpg, .png"
                                    onChange={(event) => { setChange({...change, 'replace': true, 'image': event}); }} />
                                <i className="icofont-ui-delete"
                                    onClick={() => { setChange({...change, 'delete': true, 'url': img}); }}></i>
                            </span>
                            <img src={img} className="list-product-img" />
                        </div>
                    );
                })}
                <div className="card add-product-img-icon">
                    <p>{progress && <CircularProgress />}</p>
                    <label for="add-product-image">
                        <i className="icofont-plus-circle" style={{ fontSize: "25px" }}></i>
                    </label>
                    <input type="file" id="add-product-image" accept=".jpg, .png"
                        onChange={processImage} />
                </div>
            </div>
            {error && <p>There was an error uploading the image. Please try again.</p>}
        </div>
    );
}

export default ImageUpload;
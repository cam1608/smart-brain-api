
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where("id", "=", id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

const handleImageUrl = async(req, res) => {
    const { input } = req.body;
    const PAT = process.env.CLARIFAI_API_KEY;
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID,
    },
    "inputs": [
        {
        "data": {
            "image": {
            "url": input,
            },
        },
        },
    ],
    });

    const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT,
        'Content-Type': 'application/json'
    },
    body: raw
    };

    try {
    const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
    const data = await response.json();
    res.json(data);
    } catch (error) {
    res.status(400).json('unable to work with API');
    }
    };

export { handleImage, handleImageUrl };
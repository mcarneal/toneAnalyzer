const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'LDb-UNfmq-zB1z73RKAL_yaRRkDxKpGKIaMAlSt9lUZU',
    url: 'https://gateway.watsonplatform.net/language-translator/api'
});

const translateParams = {
    text: 'Good morning',
    model_id: 'en-hu',
};

languageTranslator.translate(translateParams)
    .then(translationResult => {
        console.log(JSON.stringify(translationResult, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });



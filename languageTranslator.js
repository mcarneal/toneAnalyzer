require('dotenv').config()

const API_KEY = process.env.API_KEY_LT

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: API_KEY,
    url: 'https://gateway.watsonplatform.net/language-translator/api'
});

//translateParams is an object we will send to language translator. the obkect has two key value pairs. the first is the text we ill be translating 'text'. The second model_id is the language we will translate to. EG model_id : 'en-es' will assume the text is english(en) and the request translated text will be in spanish(es)

const translateParams = {
    text: 'Good morning',
    model_id: 'en-hu',
};

// language Translator will take in the translateParams and return a reuslt of the translated text

languageTranslator.translate(translateParams)
    .then(translationResult => {
        displayTranslation(translationResult, translateParams)
    })
    .catch(err => {
        console.log('error:', err);
    });


// displayTranslations will take in the returned results from languageTranslator and present the results in a more readable format.

const displayTranslation = (translated, original) => {
    console.log('\n',original.model_id.slice(0,2),":", original.text)
    translated.translations.map((sentence) => {
        console.log('',original.model_id.slice(3,5),":",sentence.translation)
    })
    console.log('\n','Word count:', translated.word_count)
    console.log(' Character Count: ', translated.character_count)
}

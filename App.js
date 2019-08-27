require('dotenv').config();

const API_KEY = process.env.API_KEY

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: API_KEY,
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});


const text = "Good morning everyone. I see that our quarter four metrics are lower than expected. I know we have had a tough year and moral is down. Can we think of ways to increase our performance next year";

const toneParams = {
  tone_input: { 'text': text },
  content_type: 'application/json',
};



// The function below will connect to the IBM API and return a JSON of the results. The return results unformatted.  

// toneAnalyzer.tone(toneParams)
//   .then(toneAnalysis => {
//     console.log(JSON.stringify(toneAnalysis, null, 2));
//   })
//   .catch(err => {
//     console.log('erro
//     r:', err);
//   });


// The function below will connect to the IBM API and return the results but in a easier to read layout than the above function. Two Helper functions were included : displayOverallTones and displaySentenceTones

  toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => {
    displayOverallTones(toneAnalysis)
    displaySentenceTones(toneAnalysis)
  })
  .catch(err => {
    console.log('error:', err);
  });

  // displayOverallTones will recieve a data object from a toneAlayzer and return the overall tone and score in an more readable format. 

  const displayOverallTones = (data) => {
    console.log('Overall tone analysis:')
    data.document_tone.tones.map((tone) =>{
      console.log('    ', tone.tone_name, tone.score)  
    })
  }

  // displaySentenceTones will recive a data object from a toneAnalyzer and return the a sentence break down in a more readable format.

  const displaySentenceTones = (data) => {
    console.log('Break down of analysis by sentence:','\n')
    data.sentences_tone.map((tone)=>{
      console.log(tone.text)
      tone.tones.map((tones)=>{
        console.log('    ', tones.tone_name, tones.score)
      })
    })
  }


  const toneChatParams = {
    utterances: [
      {
        text: "Hello, I'm having a problem with your product.",
        user: "customer",
      },
      {
        text: "OK, let me know what's going on, please.",
        user: "agent",
      },
      {
        text: "Well, nothing is working :(",
        user: "customer",
      },
      {
        text: "Sorry to hear that.",
        user: "agent",
      },
    ],
  };


  toneAnalyzer.toneChat(toneChatParams)
  .then(utteranceAnalyses => {
    displayUtteranceTones(utteranceAnalyses)
  })
  .catch(err => {
    console.log('error:', err);
  });

  //displayUtteranceTones will take the JSON resieved from toneAnalyzer.toneChat and return  more readable version.

  const displayUtteranceTones = (data) => {
    data.utterances_tone.map((tone)=>{
      console.log(tone.utterance_text)
      tone.tones.map((tones)=>{
        console.log('    ', tones.tone_name, tones.score)
      })
    })
  }


  // The function below is the original toneChat analyzer. It will return a JSON of the results but in a not user friendly readable version.

  // toneAnalyzer.toneChat(toneChatParams)
  // .then(utteranceAnalyses => {
  //   console.log(JSON.stringify(utteranceAnalyses, null, 2));
  // })
  // .catch(err => {
  //   console.log('error:', err);
  // });
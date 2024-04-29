const competitorAnalysisPrompt = (topicRefValue, competitorTitles) => {
  //   const jsonWithoutProperty =
  //     '[{"title1": "Unlock Pizza Perfection: Master Dough Secrets in MINUTES!", "type": "Informative, Short, Hook from competitor title 3"}, {"title2": "Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS)", "type": "Informative, Medium, Benefit from competitor title 2 & competitor title 1"}, {"title3": "5 Shocking Pizza Dough Mistakes You\'re Making (Fix It Now!)", "type": "Intriguing, Medium, Listicle inspired by competitor title "},{"title4": "Ultimate Pizza Dough Showdown: Pro Secrets Revealed!", "type": "Intriguing, Medium, Comparison inspired by competitor titles"}, {"title5": "Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide", "type": "Informative, Long, Keyword focus with instructional approach"}]';

  //   const obj1 = JSON.parse(jsonWithoutProperty);
  //   console.log(obj1);

  //   const json =
  //     '{"GeneratedTitles" : [{"title1": "Unlock Pizza Perfection Master Dough Secrets in MINUTES!", "type": "Informative, Short, Hook from competitor title 3"}, {"title2": "Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS)", "type": "Informative, Medium, Benefit from competitor title 2 & competitor title 1"}, {"title3": "5 Shocking Pizza Dough Mistakes Youre Making (Fix It Now!)", "type": "Intriguing, Medium, Listicle inspired by competitor title 3"}, {"title4": "Ultimate Pizza Dough Showdown: Pro Secrets Revealed!", "type": "Intriguing, Medium, Comparison inspired by competitor titles"}, {"title5": "Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide", "type": "Informative, Long, Keyword focus with instructional approach"}]}';

  //   const obj2 = JSON.parse(json);
  //   console.log(obj2);
  const generateTitlesPrompt = `"Generate SEO-Optimized Titles Using Competitor Analysis
  
Input:

      Competitor Titles: 
            ${competitorTitles === "" ? "Not available" : competitorTitles}

      Topic: ${topicRefValue}

Output:

      Generate five different variations of SEO-optimized YouTube titles for your video, incorporating the following strategies:

      Utilize Keywords: Prioritize keywords and phrases found in the competitor titles, while also considering your video topic.
      Title Length Variation: Aim for a mix of title lengths (short, medium, long) to cater to different search preferences.
      Content Type Analysis: Analyze the competitor titles to understand the general content type (e.g., tutorial, review). This can inform the title structure (question-based, listicle, etc.).
      Engaging Phrases: Incorporate power words or intriguing phrases to make titles more clickable.
      Avoid Clickbait: While aiming to be catchy, avoid misleading titles that don't accurately represent the video content.
      Important: Do not provide any explanations, only provide a RFC8259 complaint JSON response following the below example "Generated Titles" format without deviation.

      Example:

          User Input:

          Competitor Titles:
              "How to Make the Perfect Pizza Dough"
              "Ultimate Pizza Dough Recipe - Easy and Delicious"
              "Pizza Dough Secrets You Didn't Know! (Master the Dough)"
              Topic: Making Pizza Dough

          Generated Titles:

              [{"title": "Unlock Pizza Perfection: Master Dough Secrets in MINUTES!",
                  "type": "Informative, Short, Hook from competitor title 3"},
               {"title": "Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS)",
                  "type": "Informative, Medium, Benefit from competitor title 2 & competitor title 1"},
               {"title": "5 Shocking Pizza Dough Mistakes You're Making (Fix It Now!)",
                  "type": "Intriguing, Medium, Listicle inspired by competitor title 3"},
               {"title": "Ultimate Pizza Dough Showdown: Pro Secrets Revealed!",
                  "type": "Intriguing, Medium, Comparison inspired by competitor titles"},
               {"title": "Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide",
                  "type": "Informative, Long, Keyword focus with instructional approach"}]              
              "`;

  return generateTitlesPrompt;
};

export default competitorAnalysisPrompt;

// const generateTitlesPrompt = `"Generate SEO-Optimized Titles Using Competitor Analysis

// Input:

//       Competitor Titles:
//             ${competitorTitles}

//       Topic: ${topicRefValue}

// Output:

//       Generate five different variations of SEO-optimized YouTube titles for your video, incorporating the following strategies:

//       Utilize Keywords: Prioritize keywords and phrases found in the competitor titles, while also considering your video topic.
//       Title Length Variation: Aim for a mix of title lengths (short, medium, long) to cater to different search preferences.
//       Content Type Analysis: Analyze the competitor titles to understand the general content type (e.g., tutorial, review). This can inform the title structure (question-based, listicle, etc.).
//       Engaging Phrases: Incorporate power words or intriguing phrases to make titles more clickable.
//       Avoid Clickbait: While aiming to be catchy, avoid misleading titles that don't accurately represent the video content.

//       Example:

//           User Input:

//           Competitor Titles:
//               "How to Make the Perfect Pizza Dough"
//               "Ultimate Pizza Dough Recipe - Easy and Delicious"
//               "Pizza Dough Secrets You Didn't Know! (Master the Dough)"
//               Topic: Making Pizza Dough

//           Generated Titles:

//               Unlock Pizza Perfection: Master Dough Secrets in MINUTES! (Informative, Short, Hook from competitor title 3)
//               Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS) (Informative, Medium, Benefit from competitor title 2 & competitor title 1)
//               5 Shocking Pizza Dough Mistakes You're Making (Fix It Now!) (Intriguing, Medium, Listicle inspired by competitor title 3)
//               Ultimate Pizza Dough Showdown: Pro Secrets Revealed! (Intriguing, Medium, Comparison inspired by competitor titles)
//               Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide (Informative, Long, Keyword focus with instructional approach)"`;

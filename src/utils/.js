const userPreferencesPrompt = (
  generatedTitles,
  lengthOfTitle,
  contentType,
  tone
) => {
  const generateRefinedTitlesPrompt = `"Refine Titles Based on User Requirements
   
  Input:
  
        Generated Titles: ${generatedTitles
          ?.map((titleObj) => titleObj.title)
          ?.join("\n")}

        User Preferences:
            Desired Length of Title: ${lengthOfTitle}
            Video Content Type: ${contentType?.join(",")}
            Tone/Style:  ${tone?.join(",")}
        
        Notes(Given options for user): 
            Desired Length of Title: Only one to be choosen(Short - less than 50 characters, Medium - 50-70 characters, Long - over 70 characters)
            Video Content Type: It can be multiple(How-To, Review, Listicle, Questions, Comparisons)
            Tone/Style: It can be multiple (Serious, Humorous, Informative, Intriguing) 
  
  Output:
  
        Refine the five generated titles based on user preferences to better match the specific length, content and desired tone. Important: Do not provide any explanations, only provide a RFC8259 complaint JSON response following the below example "Refined Titles" format without deviation.
  
        Example: 
          
                  Example Input Titles :  

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

                  Example User Preferences:
                          1. Desired Length of Title: Short
                          2. Video Content Type: How-To
                          3. Tone/Style: Informative
          
                  Example Output Titles:
                  
                            [{"title": "Master Dough in Minutes!",
                                "type": "Informative, Short, How-To"},
                            {"title": "Forget Delivery! Make BEST Pizza Dough (EASY & DELICIOUS)",
                                "type": "Shortened title with focus on benefit"},
                            {"title": "5 Pizza Dough Mistakes? Fix Them Now! (Fix It Now!)",
                                "type": "Intriguing, Short, Question format"},
                            {"title": "Pizza Perfection: Easy Step-by-Step Guide",
                                "type": "Informative, Short, Keyword focus with instructional approach i.e.,How-To"},
                            {"title": "Level Up Your Pizza! (Secret Dough Hack)",
                                "type": "Intriguing, Short, Benefit with a hint of curiosity"}]
                          "`;

  return generateRefinedTitlesPrompt;
};

export default userPreferencesPrompt;

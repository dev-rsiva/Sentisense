const userPreferencesPrompt = (
  generatedTitles,
  lengthOfTitle,
  contentType,
  tone
) => {
  const generateRefinedTitlesPrompt = `"Refine Titles Based on User Requirements
   
  Input:
  
        Generated Titles: ${generatedTitles?.join("\n")}

        User Preferences:
            Desired Length of Title: ${lengthOfTitle}
            Video Content Type: ${contentType?.join(",")}
            Tone/Style:  ${tone?.join(",")}
        
        Notes(Given options for user): 
            Desired Length of Title: Only one to be choosen(Short - less than 50 characters, Medium - 50-70 characters, Long - over 70 characters)
            Video Content Type: It can be multiple(How-To, Review, Listicle, Questions, Comparisons)
            Tone/Style: It can be multiple (Serious, Humorous, Informative, Intriguing) 
  
  Output:
  
        Refine the five generated titles based on user preferences to better match the specific length, content and desired tone.
  
  Example:
  
    User Input:
    
            Generated Titles :  
                1. Unlock Pizza Perfection: Master Dough Secrets in MINUTES! (Informative, Short, Hook from competitor title 3)
                2. Forget Delivery! The BEST Homemade Pizza Dough Recipe (EASY & DELICIOUS) (Informative, Medium, Benefit from competitor title 2 & competitor title 1)
                3. 5 Shocking Pizza Dough Mistakes You're Making (Fix It Now!) (Intriguing, Medium, Listicle inspired by competitor title 3)
                4. Ultimate Pizza Dough Showdown: Pro Secrets Revealed! (Intriguing, Medium, Comparison inspired by competitor titles)
                5. Make Perfect Pizza Dough EVERY Time! Easy Step-by-Step Guide (Informative, Long, Keyword focus with instructional approach)

            User Preferences:
                1. Desired Length of Title: Short
                2. Video Content Type: How-To
                3. Tone/Style: Informative
    
    Refined Titles:
    
            1. Master Dough in Minutes! (Informative, Short, How-To) 
            2. Forget Delivery! Make BEST Pizza Dough (EASY & DELICIOUS) (Shortened title with focus on benefit)
            3. 5 Pizza Dough Mistakes? Fix Them Now! (Intriguing, Short, Question format)
            4. Pizza Perfection: Easy Step-by-Step Guide (Informative, Short, Keyword focus with instructional approach i.e.,How-To))
            5. Level Up Your Pizza! (Secret Dough Hack) (Intriguing, Short, Benefit with a hint of curiosity)"`;

  return generateRefinedTitlesPrompt;
};

export default userPreferencesPrompt;

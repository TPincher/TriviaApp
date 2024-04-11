export const fetchCategories = async () => {
  const fetchedCategories = await fetch("https://opentdb.com/api_category.php");

  const jsonCategories = await fetchedCategories.json();
  const innerCategories = jsonCategories.trivia_categories;
  const formattedCategories = innerCategories.map((category) => {
    return { category: category.name, fetchID: category.id };
  });

  // console.log(formattedCategories);
  return formattedCategories;
};

export const fetchQuestion = async (category: string) => {
  const fetchedQuestion = await fetch(
    `https://opentdb.com/api.php?amount=1${category}`
  );

  const jsonQuestion = await fetchedQuestion.json();
  const results = await jsonQuestion.results[0];

  const returnData = {
    type: results.type,
    difficulty: results.difficulty,
    category: results.category,
    answer: results.correct_answer,
    allAnswers: [results.correct_answer, ...results.incorrect_answers],
    question: results.question,
  };

  console.log(returnData);
  return returnData;
};

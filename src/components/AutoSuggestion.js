import React from 'react';

const AutoSuggestion = () => {
  const [suggestions, setSuggestions] = React.useState(['firstsuggestion']);

  return (
    <div className="auto-suggestion">
      <ul>
        {suggestions.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    </div>
  );
};
export default AutoSuggestion;

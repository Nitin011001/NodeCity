module.exports=(temp, place) => {
    let output = temp.replace('{%PLACENAME%}', place.placeName);
    output = output.replace(/{%IMAGE%}/g, place.image);
    output = output.replace(/{%FROM%}/g, place.from);
    output = output.replace(/{%FAMOUS%}/g, place.famous);
    output = output.replace(/{%CITY%}/g, place.city);
    output = output.replace(/{%QUOTE%}/g, place.quote);
    output = output.replace(/{%DESCRIPTION%}/g, place.description);
    output = output.replace(/{%ID%}/g, place.id);
    return output;
  };
  
/**
 * Converts Date type object into numeric timestamp without taking the time value.
 *
 * @author Zablon Dawit <zabjd22@gmail.com>
 */
const GetDateEpoch = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export default GetDateEpoch;

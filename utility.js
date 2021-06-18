import moment from "moment";

export const timeConvert = (time) => {
  if (time == null) {
    return;
  }
  const fireBaseTime = new Date(
    time?.seconds * 1000 + time?.nanoseconds / 1000000,
  );
  //const date = fireBaseTime.toDateString();
  //const atTime = fireBaseTime.toLocaleTimeString();
  return moment(fireBaseTime.toISOString()).fromNow();
};

export const userImage = () => {
  let number = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  return `https://randomuser.me/api/portraits/lego/${number}.jpg`;
};

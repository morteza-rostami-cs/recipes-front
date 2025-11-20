// src/utils/formatDate.js
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";

export const formatFriendlyDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid date";

  if (isToday(date)) {
    return `Today at ${format(date, "h:mm a")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mm a")}`;
  }

  return formatDistanceToNow(date, { addSuffix: true });
};

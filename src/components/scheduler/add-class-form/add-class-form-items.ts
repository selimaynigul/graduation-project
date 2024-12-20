export const addClassFormItems = {
  className: {
    label: "Class Name",
    rules: [{ required: true, message: "Please enter the class name" }],
  },
  description: {
    label: "Description",
    rules: [{ required: true, message: "Please enter a description" }],
  },
  startDate: {
    label: "Date",
    rules: [{ required: true, message: "Please select the date" }],
  },
  startTime: {
    label: "Time",
    rules: [{ required: true, message: "Please select the time" }],
  },
  trainer: {
    label: "Trainer",
    rules: [{ required: true, message: "Please select a trainer" }],
  },
  endDate: {
    label: "End Date",
    rules: [
      {
        required: true,
        message: "Please select an end date for the repeating event",
      },
    ],
  },
};

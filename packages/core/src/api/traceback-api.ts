import axios from 'axios';

const TECHNICAL_ABNORMALITY = 0;
const CONFIGURATION_PROBLEM = 4;

interface traceErrorProps {
  message: string;
  cause: string;
  userId: number;
}

export const traceError = ({message, cause, userId}: traceErrorProps) => {
  return axios.put('/ws/rest/com.axelor.exception.db.TraceBack', {
    data: {
      origin: 'mobile app',
      typeSelect: TECHNICAL_ABNORMALITY,
      categorySelect: CONFIGURATION_PROBLEM,
      date: new Date(),
      exception: message,
      message: message,
      cause: JSON.stringify(cause),
      internalUser: {id: userId},
    },
  });
};
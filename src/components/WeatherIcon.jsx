import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny className="text-yellow-400 text-4xl" />;
    case 'rain':
      return <WiRain className="text-blue-400 text-4xl" />;
    case 'clouds':
      return <WiCloudy className="text-gray-400 text-4xl" />;
    case 'snow':
      return <WiSnow className="text-blue-200 text-4xl" />;
    case 'thunderstorm':
      return <WiThunderstorm className="text-purple-500 text-4xl" />;
    case 'mist':
    case 'fog':
    case 'haze':
      return <WiFog className="text-gray-300 text-4xl" />;
    default:
      return <WiDaySunny className="text-yellow-400 text-4xl" />;
  }
};

export default WeatherIcon;

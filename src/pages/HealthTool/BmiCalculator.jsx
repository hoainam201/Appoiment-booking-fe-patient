// src/BMICalculator.js
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import Button from "@mui/material/Button";

const BMICalculator = () => {
  const { t } = useTranslation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));
      determineCategory(bmiValue);
    }
  };

  const determineCategory = (bmi) => {
    if (bmi < 18.5) {
      setCategory(t('underweight'));
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setCategory(t('normal_weight'));
    } else if (bmi >= 25 && bmi < 29.9) {
      setCategory(t('overweight'));
    } else {
      setCategory(t('obese'));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full sm:w-2/3 border-2 border-blue-700 mx-auto rounded-xl my-5">
        <h2>{t('bmi_calculator')}</h2>
        <div className="w-1/2">
          <label>{t('height')}:</label>
          <input
            className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label>{t('weight')}:</label>
          <input
            className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="flex justify-center my-2">
          <Button type="submit" variant={'contained'} size="large" onClick={calculateBMI}>{t('calculate')}</Button>
        </div>
        {bmi && (
          <div className="my-2">
            <h3>{t('your_bmi')}: {bmi}</h3>
            <p>{t('category')}: {category}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center sm:w-2/3 border-2 border-blue-700 sm:mx-auto rounded-xl my-5">
        <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500">
          <thead>
          <tr>
            <th className="px-6 py-3">{t('bmi_table.health_status')}</th>
            <th className="px-6 py-3">{t('bmi_table.bmi_range')}</th>
          </tr>
          </thead>
          <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('underweight')}</th>
            <td className="px-6 py-4">{t('bmi_table.underweight_range')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('normal_weight')}</th>
            <td className="px-6 py-4">{t('bmi_table.normal_weight_range')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('overweight')}</th>
            <td className="px-6 py-4">{t('bmi_table.overweight_range')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('obese')}</th>
            <td className="px-6 py-4">{t('bmi_table.obese_range')}</td>
          </tr>
          </tbody>
        </table>
        <div className="flex justify-center my-2">
          {t('calorie_table.title')}
        </div>
        <table className="w-3/4 text-sm text-left rtl:text-right text-gray-500">
          <thead>
          <tr className="bg-white border-b">
            <th className="px-6 py-3">{t('calorie_table.exercise')}</th>
            <th className="px-6 py-3">{t('calorie_table.approx_calories_burned')}</th>
          </tr>
          </thead>
          <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.walking')}</th>
            <td className="px-6 py-4">{t('calorie_table.walking_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.walking')}</th>
            <td className="px-6 py-4">{t('calorie_table.walking_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.jogging')}</th>
            <td className="px-6 py-4">{t('calorie_table.jogging_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.swimming')}</th>
            <td className="px-6 py-4">{t('calorie_table.swimming_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.bicycling')}</th>
            <td className="px-6 py-4">{t('calorie_table.bicycling_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.aerobic')}</th>
            <td className="px-6 py-4">{t('calorie_table.aerobic_calories')}</td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{t('calorie_table.gardening')}</th>
            <td className="px-6 py-4">{t('calorie_table.gardening_calories')}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BMICalculator;

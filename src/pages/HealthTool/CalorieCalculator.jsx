// src/CalorieCalculator.js
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import Button from "@mui/material/Button";

const CalorieCalculator = () => {
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const weightInKg = weight;
    const heightInCm = height;
    const ageInYears = age;

    let bmr;

    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
    }

    const dailyCalories = bmr * parseFloat(activity);

    setCalories(dailyCalories);
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center w-full sm:w-2/3 border-2 border-blue-700 mx-auto rounded-xl my-5">
        <p className="text-5xl font-bold mb-4 text-blue-500">{t('calorie_calculator')}</p>
        <form
          className="w-2/3"
          onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div>
              <label>{t('age')}:</label>
              <input
                className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                type="number" value={age} onChange={(e) => setAge(e.target.value)} required/>
            </div>
            <div>
              <label>{t('gender')}:</label>
              <select value={gender}
                      className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
                      onChange={(e) => setGender(e.target.value)}>
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
          </div>
          <div>
            <label>{t('weight')}:</label>
            <input
              className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
              type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
          </div>
          <div>
            <label>{t('height')}:</label>
            <input
              className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
              type="number" value={height} onChange={(e) => setHeight(e.target.value)} required/>
          </div>
          <div>
            <label>{t('activity')}:</label>
            <select
              className={`w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500`}
              value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="1.2">{t('sedentary')}</option>
              <option value="1.375">{t('lightly_active')}</option>
              <option value="1.55">{t('moderately_active')}</option>
              <option value="1.725">{t('very_active')}</option>
              <option value="1.9">{t('super_active')}</option>
            </select>
          </div>
          <div className="flex justify-center my-4">
            <Button type="submit" variant={'contained'} size="large">{t('calculate')}</Button>
          </div>
        </form>
        {calories && (
          <div className="my-4">
            <div className="text-3xl">{t('daily_caloric_needs', {calories: calories.toFixed(2)})}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start justify-start w-full sm:w-2/3 border-2 border-blue-700 mx-auto rounded-xl my-5">
        <div className="p-2">
          <div className="text-3xl hover:text-blue-500">{t('standard_daily_intake')}</div>
          <ul>
            <li className="hover:text-blue-500 text-xl">{t('fat_intake')}</li>
            <li className="hover:text-blue-500 text-xl">{t('cholesterol_intake')}</li>
            <li className="hover:text-blue-500 text-xl">{t('carbohydrates_intake')}</li>
            <li className="hover:text-blue-500 text-xl">{t('protein_intake')}</li>
          </ul>
          <div className="text-3xl">{t('calories_for_fat_loss')}</div>
          <p className="hover:text-blue-500 text-xl">{t('fat_loss_info')}</p>
          <p className="hover:text-blue-500 text-xl"><strong>{t('note')}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;

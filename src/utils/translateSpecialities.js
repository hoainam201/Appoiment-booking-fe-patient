import React from 'react';
import { useTranslation } from 'react-i18next';
import { specialitiesKey } from './constants';

export const SpecialitiesList = () => {
  const { t } = useTranslation();

  return (
    <div>
      {specialitiesKey.map(speciality => (
        <div key={speciality.id}>{t(`specialities.${speciality.key}`)}</div>
      ))}
    </div>
  );
};

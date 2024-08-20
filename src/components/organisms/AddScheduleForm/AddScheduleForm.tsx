import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserInfoStore } from '../../../store/useUserInfoStore';
import Warning from '../../../assets/images/warning.svg?react';
import {
  COLORS,
  ColorKey,
  IScheduleElement,
  IScheduleElementDTO,
  LectureInfo,
  daysOfWeek,
  initialLectureInfo,
} from '../../../constants/schedule';
import {
  getIsAddScheduleFormValid,
  getIsTimeValid,
  hasNewElementConflict,
  transformToScheduleElementDTO,
} from '../../../utils/schedule';
import { addScheduleElement } from '../../../apis/schedule';
import styles from './AddScheduleForm.module.scss';

interface IProps {
  onClose: () => void;
}

const AddScheduleForm = ({ onClose }: IProps) => {
  const queryClient = useQueryClient();
  const [lectureInfo, setLectureInfo] =
    useState<LectureInfo>(initialLectureInfo);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const startHourRef = useRef<HTMLInputElement | null>(null);
  const startMinuteRef = useRef<HTMLInputElement | null>(null);
  const endHourRef = useRef<HTMLInputElement | null>(null);
  const endMinuteRef = useRef<HTMLInputElement | null>(null);

  const { userInfo } = useUserInfoStore();

  useEffect(() => {
    const isFormValid = getIsAddScheduleFormValid(lectureInfo);
    setIsFormValid(isFormValid);
    const { startHour, startMinute, endHour, endMinute } = lectureInfo;
    const isTimeValid = getIsTimeValid(
      Number(startHour),
      Number(startMinute),
      Number(endHour),
      Number(endMinute),
    );
    setIsTimeValid(isTimeValid);
  }, [lectureInfo]);

  const handleColorClick = (color: ColorKey) => {
    setLectureInfo((prevState) => ({
      ...prevState,
      lectureColor: color,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isTimeField = [
      'startHour',
      'startMinute',
      'endHour',
      'endMinute',
    ].includes(name);

    let newValue = value;
    if (isTimeField) {
      newValue = value.replace(/\D/g, '');
      if (newValue.length > 2) return;
    }

    setLectureInfo((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (isTimeField && newValue.length === 2) {
      const nextFieldRef = {
        startHour: startMinuteRef,
        startMinute: endHourRef,
        endHour: endMinuteRef,
      }[name];

      if (nextFieldRef?.current) {
        nextFieldRef.current.focus();
        nextFieldRef.current.select();
      }
    }
  };

  const handleDayClick = (day: string) => {
    setLectureInfo((prevState) => ({ ...prevState, day }));
  };

  const postMutation = useMutation({
    mutationFn: (data: IScheduleElementDTO) =>
      addScheduleElement(data, userInfo.userName),
    onSuccess: () => {
      alert('강의 추가에 성공했습니다.');
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['schedule', userInfo.userName],
      });
    },
    onError: () => {
      alert('강의 추가를 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (isFormValid) {
      const existingSchedule = queryClient.getQueryData<IScheduleElement[]>([
        'schedule',
        userInfo.userName,
      ]);
      const formattedData = transformToScheduleElementDTO(lectureInfo);
      if (existingSchedule) {
        if (hasNewElementConflict(formattedData, existingSchedule)) {
          alert(
            '새로운 강의 시간이 기존 스케줄과 겹칩니다. 다른 시간을 선택해주세요.',
          );
          return;
        } else {
          postMutation.mutate(formattedData);
        }
      } else {
        alert(
          '스케줄 데이터를 불러올 수 없습니다. 페이지를 새로고침한 후 다시 시도해주세요.',
        );
      }
    }
  };

  const handleFormEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.modalContainer} onSubmit={handleFormEvent}>
      <div className={styles.inputField}>
        <label className={styles.inputTitle}>강의 제목</label>
        <input
          className={`${styles.textInput} ${lectureInfo.title.trim() !== '' && styles.activeInput}`}
          type="text"
          name="title"
          placeholder="ex. 경제학 수업"
          value={lectureInfo.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.colorSelectBox}>
        {Object.keys(COLORS).map((bgColor) => (
          <button
            key={bgColor}
            className={`${styles.colorBox} ${lectureInfo.lectureColor === bgColor && styles.activeColor}`}
            style={{ backgroundColor: bgColor }}
            onClick={() => handleColorClick(bgColor as ColorKey)}
          />
        ))}
      </div>
      <div className={styles.inputField}>
        <label className={styles.inputTitle}>강의실 위치</label>
        <input
          className={styles.textInput}
          type="text"
          name="location"
          placeholder="ex. 경영관 201호"
          value={lectureInfo.location}
          onChange={handleChange}
        />
      </div>
      <div className={styles.daySelectBox}>
        <p className={styles.inputTitle}>강의 시간</p>
        <div className={styles.dayOfWeek}>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={
                lectureInfo.day === day ? styles.selected : styles.dayBtn
              }
              onClick={() => {
                handleDayClick(day);
              }}
            >
              {day}
            </button>
          ))}
        </div>
        {lectureInfo.day && (
          <div className={styles.timeSelectBox}>
            <div className={styles.timeBlock}>
              <input
                type="text"
                name="startHour"
                ref={startHourRef}
                value={lectureInfo.startHour}
                onChange={handleChange}
              />
              <span className={styles.separator}>:</span>
              <input
                type="text"
                name="startMinute"
                ref={startMinuteRef}
                value={lectureInfo.startMinute}
                onChange={handleChange}
              />
            </div>
            <span className={styles.dash} />
            <div className={styles.timeBlock}>
              <input
                type="text"
                name="endHour"
                ref={endHourRef}
                value={lectureInfo.endHour}
                onChange={handleChange}
              />
              <span className={styles.separator}>:</span>
              <input
                type="text"
                name="endMinute"
                ref={endMinuteRef}
                value={lectureInfo.endMinute}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {lectureInfo.day && !isTimeValid && (
          <span className={styles.warning}>
            <Warning />
            올바른 시간대를 입력해주세요.
          </span>
        )}
      </div>
      <button
        type="submit"
        className={`${styles.submitButton} ${!isFormValid && styles.disabledBtn}`}
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        추가하기
      </button>
    </form>
  );
};

export default AddScheduleForm;

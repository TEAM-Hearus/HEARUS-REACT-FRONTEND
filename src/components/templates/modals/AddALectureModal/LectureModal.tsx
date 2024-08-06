import React, { useState, useEffect, useRef } from 'react';
import styles from './LectureModal.module.scss';
import { COLORS, ColorKey } from '../../../../constants/schedule';
import Warning from '../../../assets/images/warning.svg?react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LectureInfo {
  title: string;
  lectureColor: string;
  location: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

const LectureModal = ({ isOpen, onClose }: IProps) => {
  if (!isOpen) return null;

  const initialLectureInfo: LectureInfo = {
    title: '',
    lectureColor: '',
    location: '',
    day: '',
    startHour: '00',
    startMinute: '00',
    endHour: '00',
    endMinute: '00',
  };

  const [lectureInfo, setLectureInfo] =
    useState<LectureInfo>(initialLectureInfo);
  const [selectedColor, setSelectedColor] = useState<ColorKey | null>(null);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const startHourRef = useRef<HTMLInputElement | null>(null);
  const startMinuteRef = useRef<HTMLInputElement | null>(null);
  const endHourRef = useRef<HTMLInputElement | null>(null);
  const endMinuteRef = useRef<HTMLInputElement | null>(null);

  const isTimeValid = (
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
  ): boolean => {
    if (
      startHour < 9 ||
      startHour > 21 ||
      startMinute < 0 ||
      startMinute > 59 ||
      endHour < 9 ||
      endHour > 21 ||
      endMinute < 0 ||
      endMinute > 59
    ) {
      return false;
    }

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    if (startTime < endTime) {
      return true;
    }

    return startTime < endTime;
  };

  useEffect(() => {
    const {
      title,
      lectureColor,
      location,
      day,
      startHour,
      startMinute,
      endHour,
      endMinute,
    } = lectureInfo;
    const isValid =
      title.trim() !== '' &&
      lectureColor.trim() !== '' &&
      location.trim() !== '' &&
      day.trim() !== '' &&
      isTimeValid(
        Number(startHour),
        Number(startMinute),
        Number(endHour),
        Number(endMinute),
      );
    setIsTimeInvalid(
      !isTimeValid(
        Number(startHour),
        Number(startMinute),
        Number(endHour),
        Number(endMinute),
      ),
    );
    setIsFormValid(isValid);
  }, [lectureInfo]);

  //   useEffect(() => {
  //     lectureInfo.day && startHourRef.current.focus();
  //   }, [lectureInfo.day]);

  const handleColorClick = (color: ColorKey) => {
    setSelectedColor(color);
    setLectureInfo((prevState) => ({
      ...prevState,
      lectureColor: color,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (['startHour', 'startMinute', 'endHour', 'endMinute'].includes(name)) {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length > 2) return;

      setLectureInfo((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));

      if (numericValue.length === 2) {
        if (name === 'startHour') {
          startMinuteRef.current?.focus();
          startMinuteRef.current?.select();
        } else if (name === 'startMinute') {
          endHourRef.current?.focus();
          endHourRef.current?.select();
        } else if (name === 'endHour') {
          endMinuteRef.current?.focus();
          endMinuteRef.current?.select();
        }
      }
    } else {
      setLectureInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDayClick = (day: string) => {
    setLectureInfo((prevState) => ({
      ...prevState,
      day: day,
    }));
    setTimeout(() => {
      startHourRef.current?.focus();
      startHourRef.current?.select();
    }, 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log('Lecture added:', lectureInfo);
      onClose();
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.inputField}>
          <label>강의 제목</label>
          <input
            className={lectureInfo.title ? styles.titleInput : ''}
            type="text"
            name="title"
            placeholder="ex. 경제학 수업"
            value={lectureInfo.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.colorSelectBox}>
          {Object.keys(COLORS).map((backgroundColor) => (
            <button
              key={backgroundColor}
              className={styles.colorBox}
              style={{
                backgroundColor,
                borderColor:
                  selectedColor === backgroundColor
                    ? COLORS[backgroundColor as ColorKey]
                    : 'transparent',
              }}
              onClick={() => handleColorClick(backgroundColor as ColorKey)}
            />
          ))}
        </div>
        <div className={styles.inputField}>
          <label>강의실 위치</label>
          <input
            className={lectureInfo.location ? styles.titleInput : ''}
            type="text"
            name="location"
            placeholder="ex. 경영관 201호"
            value={lectureInfo.location}
            onChange={handleChange}
          />
        </div>
        <div className={styles.daySelectBox}>
          <p>강의 시간</p>
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
          {lectureInfo.day ? (
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
          ) : (
            <></>
          )}

          {!lectureInfo.day ? (
            <></>
          ) : (
            isTimeInvalid && (
              <span className={styles.warning}>
                <Warning />
                올바른 시간대를 입력해주세요.
              </span>
            )
          )}
        </div>
        <button
          //   className={isFormValid ? styles.submitButton : styles.disabledBtn}
          className={`${styles.submitButton} ${isFormValid ? '' : styles.disabledBtn}`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default LectureModal;

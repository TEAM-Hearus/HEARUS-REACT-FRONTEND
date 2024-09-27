import { useEffect, useState } from 'react';
import Down from '../../assets/images/arrow/down-arrow.svg?react';
import Up from '../../assets/images/arrow/up-arrow.svg?react';
import { LICENSES } from '../../constants/landing';
import styles from './License.module.scss';
import { Link } from 'react-router-dom';

const License = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.wholeContainer}>
      <article className={styles.mit}>
        <h1 className={styles.h1}>MIT LICENSE</h1>
        <h2>Copyright (c) 2024 Hearus</h2>
        <p>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>
        <p>
          <strong>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </strong>
        </p>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
        <h2>추가 정보</h2>
        <p>
          이 프로젝트는 MIT 라이선스 하에 배포됩니다. 라이선스에 대한 자세한
          내용은 위의 전문을 참조하세요.
        </p>
      </article>
      <p className={styles.library}>
        This project includes the following open-source software. Below are
        their license and copyright details.
      </p>
      <div className={styles.librarysContainer}>
        {LICENSES.map((license) => (
          <section key={license.name} className={styles.licenseItem}>
            <div className={styles.libraryHeaderwrapper}>
              <div
                className={styles.licenseHeader}
                onClick={() => toggleAccordion(license.name)}
              >
                <p>
                  {license.name} - {license.version}
                </p>
                {openAccordion === license.name ? <Up /> : <Down />}
              </div>
            </div>
            {openAccordion === license.name && (
              <article className={styles.licenseContent}>
                <Link to={license.link} target="_blank">
                  {license.link}
                </Link>
                <p>License: {license.license}</p>
                {license.copyright && <p>Copyright: {license.copyright}</p>}
                {license.text.map((text) => (
                  <p className={styles.licenseText}>{text}</p>
                ))}
              </article>
            )}
          </section>
        ))}
      </div>
    </main>
  );
};

export default License;

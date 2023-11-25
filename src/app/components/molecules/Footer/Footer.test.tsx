import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import * as router from 'react-router';
import ReactTestRenderer from 'react-test-renderer';

import { TEST_ID_MAP, TEXT_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';
import { Footer } from './Footer.component';

describe('Компонент Footer', () => {
	it('должен рендериться', () => {
		testProvidersFn();
		expect(screen.getByTestId(TEST_ID_MAP.footer)).toBeInTheDocument();
	});

	describe("компоненты внутри Footer'а", () => {
		describe('logo', () => {
			it('должно рендериться', () => {
				testProvidersFn();
				expect(screen.getByTestId(TEST_ID_MAP.logo)).toBeInTheDocument();
			});

			it('должен быть переход на главную страницу при клике на лого', () => {
				const navigate = jest.fn();

				jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
				testProvidersFn('/basket', true);

				const logo = screen.getByTestId(TEST_ID_MAP.logo);

				userEvent.click(logo);

				waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
			});
		});

		describe('пунты меню', () => {
			beforeEach(() => testProvidersFn());

			Object.entries(TEXT_MAP).forEach(([key, value]) => {
				it(`должен рендериться пункт ${key}`, () => {
					expect(screen.getByTestId(TEST_ID_MAP.footer)).toHaveTextContent(
						value
					);
				});
			});
		});

		describe('контакты', () => {
			it('должны рендериться', () => {
				testProvidersFn();
				expect(screen.getByTestId(TEST_ID_MAP.contacts)).toBeInTheDocument();
			});
		});
	});

	it("должен соответствовать snapshot'у", () => {
		const tree = ReactTestRenderer.create(<Footer />).toJSON();

		expect(tree).toMatchInlineSnapshot(`
		<div
		  className="MuiBox-root css-i9gxme"
		  data-testid="footer"
		>
		  <header
		    className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionSticky css-9jgc22-MuiPaper-root-MuiAppBar-root"
		  >
		    <div
		      className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-hyum1k-MuiToolbar-root"
		    >
		      <button
		        aria-label="open drawer"
		        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
		        disabled={false}
		        onBlur={[Function]}
		        onContextMenu={[Function]}
		        onDragLeave={[Function]}
		        onFocus={[Function]}
		        onKeyDown={[Function]}
		        onKeyUp={[Function]}
		        onMouseDown={[Function]}
		        onMouseLeave={[Function]}
		        onMouseUp={[Function]}
		        onTouchEnd={[Function]}
		        onTouchMove={[Function]}
		        onTouchStart={[Function]}
		        tabIndex={0}
		        type="button"
		      >
		        <div
		          data-testid="footerLogo"
		          onClick={[Function]}
		          style={
		            {
		              "color": "white",
		            }
		          }
		        />
		      </button>
		      <div
		        className="MuiBox-root css-i9gxme"
		      />
		      <div
		        className="sc-hKFymg hyCkvh"
		      >
		        <ul
		          className="MuiList-root MuiList-padding css-duwaa2-MuiList-root"
		        >
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Каталог
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Акции
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Новости
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Отзывы
		              </span>
		            </div>
		          </li>
		        </ul>
		        <ul
		          className="MuiList-root MuiList-padding css-duwaa2-MuiList-root"
		        >
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Оплата и доставка
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Часто спрашивают
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Обратная связь
		              </span>
		            </div>
		          </li>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root css-tlelie-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                Контакты
		              </span>
		            </div>
		          </li>
		        </ul>
		        <div
		          className="sc-bdnyFh ieBIWd"
		          data-testid="contacts"
		        >
		          <h5
		            className="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root"
		          >
		            Мы на связи
		          </h5>
		          <li
		            className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-ykqd4v-MuiListItem-root"
		            data-testid="phoneAndEmail"
		            disabled={false}
		          >
		            <div
		              className="MuiListItemText-root MuiListItemText-multiline sc-gtsqUy jzzROP css-konndc-MuiListItemText-root"
		            >
		              <span
		                className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root"
		              >
		                8 (999) 00-00-00
		              </span>
		              <p
		                className="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary css-83ijpv-MuiTypography-root"
		              >
		                dogfood.ru@gmail.com
		              </p>
		            </div>
		          </li>
		          <div
		            className="sc-dlniIP kbQwUR"
		          >
		            <svg
		              aria-hidden={true}
		              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
		              data-testid="telegram"
		              focusable="false"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
		              />
		            </svg>
		            <svg
		              aria-hidden={true}
		              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
		              data-testid="watsApp"
		              focusable="false"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"
		              />
		            </svg>
		            <svg
		              aria-hidden={true}
		              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
		              data-testid="instagram"
		              focusable="false"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
		              />
		            </svg>
		            <svg
		              aria-hidden={true}
		              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
		              data-testid="facebook"
		              focusable="false"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
		              />
		            </svg>
		            <svg
		              aria-hidden={true}
		              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
		              data-testid="twitter"
		              focusable="false"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
		              />
		            </svg>
		          </div>
		        </div>
		      </div>
		    </div>
		  </header>
		</div>
	`);
	});
});

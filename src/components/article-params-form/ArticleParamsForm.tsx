import { useState } from 'react';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ initialState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const handleToggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleReset = () => {
		setFormState(initialState);
		onApply(initialState);
		setIsOpen(false);
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			{isOpen && (
				<div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
			)}

			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleApply}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<div className={styles.formGroup}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState((prev) => ({
									...prev,
									fontFamilyOption: option,
								}))
							}
						/>
					</div>

					<div className={styles.formGroup}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: option }))
							}
						/>
					</div>

					<div className={styles.formGroup}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontColor: option }))
							}
						/>
					</div>

					<Separator />

					<div className={styles.formGroup}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, backgroundColor: option }))
							}
						/>
					</div>

					<div className={styles.formGroup}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, contentWidth: option }))
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

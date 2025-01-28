import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
}

const useSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
	  setIsOpen(prevState => !prevState);
	};

	return {
	  isOpen,
	  toggleSidebar,
	};
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const {isOpen, toggleSidebar} = useSidebar();

	const ref = useRef<HTMLDivElement | null>(null);
    
    const handleOutsideClickClose = (newValue: boolean) => {
        if (!newValue && isOpen) {
            toggleSidebar();
        }
    };

    useOutsideClickClose({
        isOpen,
        onChange: handleOutsideClickClose,
        rootRef: ref,
    });

    const { setAppState } = props;
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
	}

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside className={clsx(styles.container, isOpen ? styles.container_open : styles.container)} ref={ref}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase align='center'>
						Задайте параметры
					</Text>
					<Select selected={formState.fontFamilyOption} options={fontFamilyOptions} onChange={handleChange('fontFamilyOption')} title='Шрифт' />
					<RadioGroup name='' selected={formState.fontSizeOption} options={fontSizeOptions}  onChange={handleChange('fontSizeOption')} title='Размер шрифта' />
					<Select selected={formState.fontColor} options={fontColors} onChange={handleChange('fontColor')} title='Цвет шрифта' />
					<Separator />
					<Select selected={formState.backgroundColor} options={backgroundColors} onChange={handleChange('backgroundColor')} title='Цвет фона' />
					<Select selected={formState.contentWidth} options={contentWidthArr} onChange={handleChange('contentWidth')} title='Ширина контента' />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

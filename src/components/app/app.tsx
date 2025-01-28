import clsx from "clsx";
import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [appState, setAppState] = useState<ArticleStateType>(defaultArticleState);
	
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppState={setAppState}  />
			<Article />
		</main>
	);
};
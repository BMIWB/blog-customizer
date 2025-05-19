import { useState } from 'react';
import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';
export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				initialState={appliedState}
				onApply={setAppliedState}
			/>
			<Article />
		</main>
	);
};

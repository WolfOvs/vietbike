import React from "react";
import PropTypes from "prop-types";
import { CardWrapper, Header, CardContent } from "./style";

const CardTable = ({ title, children, metadata, className }) => (
    // <CardWrapper data-reference-table={metadata} draggable="true" data-table="draggable">
		<CardWrapper>
      <Header>{title}</Header>
      <CardContent className={className}>{children}</CardContent>
    </CardWrapper>
  );

CardTable.propTypes = {
  title: PropTypes.string.isRequired
};

CardTable.defaultProps = {
	title: ''
}

export default CardTable;

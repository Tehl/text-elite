import { connect } from "react-redux";
import Prompt from "./Prompt";
import { getCash } from "/state/selectors";

const mapStateToProps = state => ({
  cash: getCash(state)
});

const PromptContainer = connect(mapStateToProps)(Prompt);

export default PromptContainer;

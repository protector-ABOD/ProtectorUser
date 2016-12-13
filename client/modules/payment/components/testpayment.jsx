import React from 'react';

class NewPost extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <div className="content-container login-body-container align-middle">
        <div className="row">
          <div className="col-xs-12 pad-all-20">
            <div className="col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2 active-form">
              <form className="new-post" onSubmit={this.createPost.bind(this)}>
                <h2>Test Payment</h2>
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="paymentId" ref="paymentId" placeholder="Payment ID"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="refNo" ref="refNo" placeholder="Ref No."/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="amount" ref="amount" placeholder="Amount"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="currency" ref="currency" placeholder="Currency"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="prodDesc" ref="prodDesc" placeholder="Prod Desc"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="userEmail" ref="userEmail" placeholder="User Email"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="userContact" ref="userContact" placeholder="User Contact"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="remark" ref="remark" placeholder="Remark"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <input type="text" className="form-control" id="lang" ref="lang" placeholder="Language"/>
                </div>
                <div className="row pad-top-fixed-15">
                  <button type="submit" className="btn btn-success btn-100">Test Payment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  createPost(event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {create} = this.props;
    const {paymentId, refNo, amount, currency, prodDesc, userName, userEmail, userContact, remark, lang} = this.refs;

    create(paymentId.value, refNo.value, amount.value, currency.value, prodDesc.value, userName.value, userEmail.value, userContact.value, remark.value, lang.value);
  }
}

export default NewPost;

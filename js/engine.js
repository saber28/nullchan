"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthForm = function (_React$Component) {
  _inherits(AuthForm, _React$Component);

  function AuthForm(props) {
    _classCallCheck(this, AuthForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AuthForm).call(this, props));

    _this.state = props;
    return _this;
  }

  _createClass(AuthForm, [{
    key: "showAuthDialog",
    value: function showAuthDialog() {
      Nullchan.cmd("certSelect", [["zeroid.bit"]]);
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var newSign = event.currentTarget.value;
      if (newSign == "other") {
        this.showAuthDialog();
        event.preventDefault();
        event.currentTarget.value = "anonymous";
        return;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content;
      if (!!!this.state.userName) {
        content = React.createElement(
          "div",
          { className: "auth-please", onClick: this.showAuthDialog },
          React.createElement(
            "u",
            null,
            "Authorize"
          ),
          " to post messages.",
          React.createElement("br", null),
          "You will still be able to post anonymously."
        );
      } else {
        content = React.createElement(
          "div",
          null,
          React.createElement(
            "select",
            { name: "name", className: "name", onChange: this.handleChange.bind(this), defaultValue: "anonymous" },
            React.createElement(
              "option",
              { value: "anonymous" },
              "Anonymous"
            ),
            React.createElement(
              "option",
              { value: "signed" },
              this.state.userName
            ),
            React.createElement(
              "option",
              { value: "other" },
              "select other..."
            )
          ),
          React.createElement("input", { type: "submit", value: "Submit!", className: "submit" })
        );
      }

      return React.createElement(
        "div",
        { className: "auth-form" },
        content
      );
    }
  }]);

  return AuthForm;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoardPage = function (_React$Component) {
  _inherits(BoardPage, _React$Component);

  function BoardPage(props) {
    _classCallCheck(this, BoardPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoardPage).call(this, props));

    _this.threadMap = {};
    _this.state = props;
    return _this;
  }

  _createClass(BoardPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var content = "";
      var buttonText = "create new thread";
      if (Nullchan.currentPage == "thread") {
        buttonText = "reply to this thread";
      }

      if (!!!this.props.threads) {
        content = React.createElement(
          "div",
          { id: "empty-board" },
          "It looks like this board is empty. ",
          React.createElement("br", null),
          " Why don't you post something?"
        );
      } else {

        content = this.props.threads.map(function (thread) {
          return React.createElement(Thread, {
            ref: function ref(t) {
              return _this2.threadMap[thread[0].hashsum] = t;
            },
            key: thread[0].hashsum,
            posts: thread,
            full: Nullchan.currentPage == "thread"
          });
        });
      }

      return React.createElement(
        "div",
        { id: "board-page" },
        React.createElement(FormButton, { text: buttonText, hidden: this.state.formShown }),
        React.createElement(Form, { hidden: !this.state.formShown, ref: function ref(f) {
            return _this2.rForm = f;
          } }),
        React.createElement("hr", null),
        content
      );
    }
  }]);

  return BoardPage;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

    _this.state = props;
    return _this;
  }

  _createClass(Form, [{
    key: "called",
    value: function called() {
      var selectedText = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this._textarea.focus();
      if (!!selectedText) {
        this._textarea.value = this._textarea.value + selectedText;
      }
    }
  }, {
    key: "showBlur",
    value: function showBlur() {
      View.formBlurred = true;
      this._node.className = "form loading";
    }
  }, {
    key: "hideBlur",
    value: function hideBlur() {
      View.formBlurred = false;
      this._node.className = "form";
    }
  }, {
    key: "clear",
    value: function clear() {
      this._node.reset();
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      this.showBlur();
      var data = this.collectFormData();
      Images.process(data).then(function (modifiedData) {
        Files.uploadPost(modifiedData).then(function (newPost) {
          _this2.hideBlur();
          _this2.clear();
          SeenCount.setLocalCounter(Nullchan.currentBoard.key, true);

          if (_this2.props.isReply) {
            if (!!View.postWithReplyForm) {
              View.postWithReplyForm.setState({ showForm: false });
              View.postWithReplyForm = null;
            }
            Threads.appendPost(newPost);
            setTimeout(function () {
              SeenCount.setLocalCounter(Nullchan.currentBoard.key);
            }, 2000);
          } else {
            View.rBoardPage.setState({ formShown: false });
            Nullchan.determineRoute();
          }
        });
      });
    }
  }, {
    key: "collectFormData",
    value: function collectFormData() {
      var result = {
        body: this._node.getElementsByClassName("text")[0].value.trim(),
        file: this._node.getElementsByClassName("file")[0].files[0],
        created_at: Helpers.unixTimestamp(),
        parent: this._node.getElementsByClassName("parent")[0].value
      };
      if (!!!result.parent) {
        result.parent = null;
      }
      var name = this._node.getElementsByClassName("name")[0];
      result.anonymous = name.options[name.selectedIndex].value == "anonymous";
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var display = "block";
      var id = "top-form";

      if (this.props.hidden == true) {
        display = "none";
      }

      if (this.props.isReply == true) {
        id = "reply-form";
      }

      return React.createElement(
        "form",
        { id: id, className: "form", style: { display: display },
          onSubmit: this.handleSubmit.bind(this), ref: function ref(f) {
            return _this3._node = f;
          } },
        React.createElement(
          "div",
          { className: "form-preloader" },
          React.createElement(
            "span",
            null,
            "sending your message..."
          )
        ),
        React.createElement(
          "table",
          null,
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Comment"
              ),
              React.createElement(
                "td",
                null,
                React.createElement("textarea", { placeholder: "Up to 3000 symbols, required if no file attached",
                  name: "body", className: "text", ref: function ref(t) {
                    return _this3._textarea = t;
                  } }),
                React.createElement("input", { type: "hidden", name: "parent", className: "parent", value: this.state.parent })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "File"
              ),
              React.createElement(
                "td",
                null,
                React.createElement("input", { type: "file", name: "file", className: "file" })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Sign as"
              ),
              React.createElement(
                "td",
                null,
                React.createElement(AuthForm, { ref: function ref(a) {
                    return View.rAuthForm = a;
                  }, userName: Nullchan.shortUserName() })
              )
            )
          )
        )
      );
    }
  }]);

  return Form;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormButton = function (_React$Component) {
  _inherits(FormButton, _React$Component);

  function FormButton() {
    _classCallCheck(this, FormButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormButton).apply(this, arguments));
  }

  _createClass(FormButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      View.rBoardPage.setState({ formShown: true }, function () {
        View.rBoardPage.rForm.called();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var display = "block";
      if (this.props.hidden == true) {
        display = "none";
      }

      return React.createElement(
        "div",
        { id: "form-call-button", style: { display: display }, onClick: this.handleClick },
        "[ ",
        React.createElement(
          "span",
          { className: "text" },
          this.props.text
        ),
        " ]"
      );
    }
  }]);

  return FormButton;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));

    _this.state = props;
    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      this.link = React.createElement(BoardLink, { boardKey: this.state.board.key, boardName: this.state.board.name });
      return React.createElement(
        "div",
        null,
        this.link,
        React.createElement(
          "div",
          { id: "stats" },
          this.state.siteInfo.settings.peers,
          " peers, ",
          Helpers.formatSizeUnits(this.state.siteInfo.settings.size)
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var BoardLink = function (_React$Component2) {
  _inherits(BoardLink, _React$Component2);

  function BoardLink() {
    _classCallCheck(this, BoardLink);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BoardLink).apply(this, arguments));
  }

  _createClass(BoardLink, [{
    key: "render",
    value: function render() {
      var display = "none";
      if (!!this.props.boardName) {
        display = "inline-block";
      }
      return React.createElement(
        "span",
        { style: { display: display } },
        React.createElement(
          "a",
          { href: Helpers.fixLink("?/" + this.props.boardKey + "/"),
            className: "board-name", target: "_parent" },
          this.props.boardName
        ),
        " on ",
        React.createElement(
          "a",
          { href: Helpers.fixLink("/0chan.bit"), target: "_parent",
            id: "nullchan-link", className: "to-main" },
          "0chan.bit"
        )
      );
    }
  }]);

  return BoardLink;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoardLine = function (_React$Component) {
  _inherits(BoardLine, _React$Component);

  function BoardLine() {
    _classCallCheck(this, BoardLine);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BoardLine).apply(this, arguments));
  }

  _createClass(BoardLine, [{
    key: "render",
    value: function render() {
      var unread = "";
      if (this.props.data.unread > 0) {
        unread = "+" + this.props.data.unread;
      }
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "unread" },
          unread
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "a",
            { href: Helpers.fixLink("?/" + this.props.data.key + "/") },
            this.props.data.name
          )
        )
      );
    }
  }]);

  return BoardLine;
}(React.Component);

var MainPage = function (_React$Component2) {
  _inherits(MainPage, _React$Component2);

  function MainPage(props) {
    _classCallCheck(this, MainPage);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MainPage).call(this, props));

    _this2.state = props;
    return _this2;
  }

  _createClass(MainPage, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "glagne", key: "mainpage" },
        React.createElement(
          "pre",
          { id: "logo" },
          React.createElement(
            "code",
            null,
            "\n  /$$$$$$            /$$                          \n /$$$_  $$          | $$                          \n| $$$$\\ $$  /$$$$$$$| $$$$$$$   /$$$$$$  /$$$$$$$ \n| $$ $$ $$ /$$_____/| $$__  $$ |____  $$| $$__  $$\n| $$\\ $$$$| $$      | $$  \\ $$  /$$$$$$$| $$  \\ $$\n| $$ \\ $$$| $$      | $$  | $$ /$$__  $$| $$  | $$\n|  $$$$$$/|  $$$$$$$| $$  | $$|  $$$$$$$| $$  | $$\n \\______/  \\_______/|__/  |__/ \\_______/|__/  |__/\n          "
          )
        ),
        React.createElement("hr", null),
        React.createElement(
          "blockquote",
          { className: "monospace" },
          "fork me on ",
          React.createElement(
            "a",
            { href: "https://github.com/Nullchan/nullchan", target: "_parent" },
            "GitHub"
          ),
          " (v ",
          VERSION,
          ")"
        ),
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "inner" },
          React.createElement(
            "table",
            null,
            React.createElement(
              "tbody",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  { className: "board-list-container" },
                  React.createElement(
                    "table",
                    { id: "board-list" },
                    React.createElement(
                      "tbody",
                      null,
                      this.state.boards.map(function (board) {
                        return React.createElement(BoardLine, { key: board.key, data: board });
                      })
                    )
                  ),
                  React.createElement(
                    "span",
                    null,
                    "last post: ",
                    React.createElement(
                      "em",
                      { id: "last-post" },
                      this.state.lastPostTime
                    )
                  )
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    "blockquote",
                    null,
                    React.createElement(
                      "strong",
                      null,
                      "0chan"
                    ),
                    " is an imageboard engine",
                    React.createElement("br", null),
                    "currently in development.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(
                      "em",
                      { style: { color: "orange !important" } },
                      "To 8ch newfriends"
                    ),
                    ": welcome! Sorry about the mess, this site is still very fresh and raw. I didn't advertise it on 8ch, some random guy did. This is basically just a tech demo which misses a lot of features that you're accustomed to, but it will get better with time.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("hr", null),
                    React.createElement(
                      "span",
                      null,
                      React.createElement(
                        "em",
                        null,
                        "Current development status:"
                      ),
                      "Investigating image processing errors (15.02.2016)"
                    ),
                    React.createElement("br", null),
                    " "
                  )
                )
              )
            )
          )
        ),
        React.createElement("hr", null),
        React.createElement(
          "blockquote",
          { className: "monospace" },
          "message me on ",
          React.createElement(
            "a",
            { href: Helpers.fixLink("/Mail.ZeroNetwork.bit/?to=sthetz"), target: "_parent" },
            "ZeroMail"
          )
        )
      );
    }
  }]);

  return MainPage;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_React$Component) {
  _inherits(NotFound, _React$Component);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).apply(this, arguments));
  }

  _createClass(NotFound, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "not-found" },
        React.createElement(
          "h1",
          null,
          "Nothing found."
        ),
        React.createElement(
          "a",
          { target: "_parent", href: Helpers.fixLink("/0chan.bit") },
          "return to index"
        )
      );
    }
  }]);

  return NotFound;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_React$Component) {
  _inherits(Post, _React$Component);

  function Post(props) {
    _classCallCheck(this, Post);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Post).call(this, props));

    _this.state = props;
    return _this;
  }

  _createClass(Post, [{
    key: "shortHashsum",
    value: function shortHashsum() {
      return this.state.data.hashsum.substring(22, 32);
    }
  }, {
    key: "userName",
    value: function userName() {
      return Nullchan.shortUserName(this.state.data.cert_user_id);
    }
  }, {
    key: "formattedTime",
    value: function formattedTime() {
      return Helpers.timeSince(this.state.data.created_at);
    }
  }, {
    key: "renderMarkup",
    value: function renderMarkup() {
      return { __html: Markup.render(this.state.data.body) };
    }
  }, {
    key: "bodyClick",
    value: function bodyClick(event) {
      if (event.target.className == "reflink") {
        var hash = event.target.innerHTML.substring(8);
        var post = Threads.shortMap[hash];

        if (!!post) {
          var node = document.getElementById("post-" + post.hashsum);
          if (!!node) {
            event.preventDefault();
            node.scrollIntoView();
          }
        }
      }
    }
  }, {
    key: "callForm",
    value: function callForm() {
      var _this2 = this;

      if (View.formBlurred) {
        return;
      }

      if (!!View.postWithReplyForm) {
        View.postWithReplyForm.setState({ showForm: false });
      }
      View.postWithReplyForm = this;
      this.setState({ showForm: true }, function () {
        View.rReplyForm.called(">>" + _this2.shortHashsum() + "\n");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var klass = "post";
      var button = "";
      var picture = "";
      var form = "";

      if (!!this.state.data.parent) {
        klass += " reply";
      } else {
        klass += " opening";
        if (Nullchan.currentPage == "list") {
          button = React.createElement(
            "a",
            { target: "_parent", className: "thread-link",
              href: Helpers.fixLink("?/" + this.state.data.board + "/thread/" + this.state.data.hashsum) },
            "[ ",
            React.createElement(
              "span",
              { className: "highlighted" },
              "open thread"
            ),
            " ]"
          );
        }
      }

      if (!!this.state.data.file_thumb) {
        picture = React.createElement(
          "a",
          { href: this.state.data.file_full, target: "_blank" },
          React.createElement("img", { className: "attachment", src: this.state.data.file_thumb })
        );
      }

      if (this.state.showForm == true) {
        form = React.createElement(Form, { hidden: false, ref: function ref(f) {
            return View.rReplyForm = f;
          },
          isReply: true, parent: this.state.data.parent || this.state.data.hashsum });
      }

      return React.createElement(
        "div",
        { className: "post-wrapper" },
        React.createElement(
          "div",
          { className: klass,
            "data-hashsum": this.state.data.hashsum, id: "post-" + this.state.data.hashsum },
          React.createElement(
            "div",
            { className: "info" },
            React.createElement(
              "div",
              { className: "time-and-id" },
              React.createElement(
                "span",
                null,
                !!this.state.data.anonymous ? "Anonymous" : "" + this.userName(),
                " wrote ",
                this.formattedTime(),
                ","
              ),
              " ",
              React.createElement(
                "em",
                { className: "post-id", onClick: this.callForm.bind(this) },
                "#",
                this.shortHashsum()
              )
            ),
            button
          ),
          picture,
          React.createElement("blockquote", { className: "text", onClick: this.bodyClick,
            dangerouslySetInnerHTML: this.renderMarkup() })
        ),
        form
      );
    }
  }]);

  return Post;
}(React.Component);

var Thread = function (_React$Component2) {
  _inherits(Thread, _React$Component2);

  function Thread(props) {
    _classCallCheck(this, Thread);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Thread).call(this, props));

    _this3.state = props;
    return _this3;
  }

  _createClass(Thread, [{
    key: "render",
    value: function render() {
      console.log(URL_REGEXP);
      var skip = "";
      var rest = 1;
      if (this.state.full == false) {
        var count = this.state.posts.length - 6;
        if (count > 0) {
          skip = React.createElement(SkipGap, { count: count, parent: this.state.posts[0].hashsum });
          rest = this.state.posts.length - 5;
        }
      }

      return React.createElement(
        "div",
        { id: "thread-" + this.state.posts[0].hashsum, className: "thread" },
        React.createElement(Post, { data: this.state.posts[0] }),
        skip,
        this.state.posts.slice(rest, this.state.posts.length).map(function (post) {
          return React.createElement(Post, { data: post, key: post.hashsum });
        })
      );
    }
  }]);

  return Thread;
}(React.Component);

var SkipGap = function (_React$Component3) {
  _inherits(SkipGap, _React$Component3);

  function SkipGap() {
    _classCallCheck(this, SkipGap);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SkipGap).apply(this, arguments));
  }

  _createClass(SkipGap, [{
    key: "handleClick",
    value: function handleClick() {
      View.rBoardPage.threadMap[this.props.parent].setState({ full: true });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "skip-gap", onClick: this.handleClick.bind(this) },
        this.props.count,
        " post(s) omitted. ↕ ",
        React.createElement(
          "span",
          { className: "expand-button" },
          "expand"
        )
      );
    }
  }]);

  return SkipGap;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boards = function () {
  _createClass(Boards, [{
    key: "list",
    get: function get() {
      return this._list;
    }
  }]);

  function Boards() {
    _classCallCheck(this, Boards);

    this._list = [];
  }

  _createClass(Boards, [{
    key: "getByKey",
    value: function getByKey(key) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var board = _step.value;

          if (board.key == key) {
            return board;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this = this;

      return new Promise(function (resolve) {
        Nullchan.cmd("fileGet", "data/boards.json", function (data) {
          _this._list = JSON.parse(data).boards;
          SeenCount.getUnread().then(function (unreads) {
            for (var i in _this.list) {
              _this._list[i].unread = unreads[_this.list[i].key];
            }
            resolve();
          });
        });
      });
    }
  }]);

  return Boards;
}();

window.Boards = new Boards();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, null, [{
    key: "execute",
    value: function execute(query) {
      return new Promise(function (resolve) {
        Nullchan.cmd("dbQuery", query.trim(), function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "getLastPost",
    value: function getLastPost() {
      var _this = this;

      return new Promise(function (resolve) {
        var query = "\n        SELECT message.* FROM message\n        ORDER BY message.created_at DESC LIMIT 1\n      ";
        _this.execute(query).then(function (response) {
          resolve(response[0]);
        });
      });
    }
  }, {
    key: "getMessageCountByBoard",
    value: function getMessageCountByBoard() {
      var _this2 = this;

      return new Promise(function (resolve) {
        var query = "SELECT message.board, COUNT(*) FROM message GROUP BY board";
        _this2.execute(query).then(function (response) {
          var result = {};
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = response[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var count = _step.value;

              result[count.board] = count["COUNT(*)"];
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "loadSingleThread",
    value: function loadSingleThread(boardKey, threadHash) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var query = "\n        SELECT message.*, keyvalue.value AS cert_user_id FROM message\n        LEFT JOIN json AS data_json USING (json_id)\n        LEFT JOIN json AS content_json ON (\n          data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n        )\n        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\n        WHERE message.board = '" + boardKey + "' AND\n        (message.hashsum = '" + threadHash + "' OR message.parent = '" + threadHash + "')\n        ORDER BY message.created_at ASC\n      ";
        console.log(query);
        _this3.execute(query).then(function (response) {
          console.log(response);
          resolve(response);
        });
      });
    }
  }, {
    key: "loadMessagesOnBoard",
    value: function loadMessagesOnBoard(boardKey) {
      var _this4 = this;

      return new Promise(function (resolve) {
        var query = "\n        SELECT message.*, keyvalue.value AS cert_user_id FROM message\n        LEFT JOIN json AS data_json USING (json_id)\n        LEFT JOIN json AS content_json ON (\n          data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n        )\n        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\n        WHERE message.board = '" + boardKey + "'\n      ";
        _this4.execute(query).then(function (response) {
          resolve(response);
        });
      });
    }
  }]);

  return Database;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
  function Files() {
    _classCallCheck(this, Files);

    this.optionalOK = false;
  }

  _createClass(Files, [{
    key: "path",
    value: function path(fileName) {
      return "data/users/" + Nullchan.siteInfo.auth_address + "/" + fileName;
    }
  }, {
    key: "checkIfOptionalOK",
    value: function checkIfOptionalOK() {
      var _this = this;

      return new Promise(function (resolve) {
        if (_this.optionalOK == true) {
          resolve();
          return;
        }
        var options = { inner_path: _this.path("content.json"), required: false };
        Nullchan.cmd("fileGet", options, function (contentJson) {
          if (!!!contentJson) {
            _this.publishBasicContentJson().then(function (contentJson) {
              _this.setOptional(contentJson).then(function () {
                resolve();
              });
            });
          } else {
            var data = JSON.parse(contentJson);
            if (data.optional == ".*\\.(png|jpg|gif)") {
              _this.setOptional(contentJson).then(function () {
                resolve();
              });
            } else {
              _this.optionalOK = true;
              resolve();
            }
          }
        });
      });
    }
  }, {
    key: "publishBasicContentJson",
    value: function publishBasicContentJson() {
      var _this2 = this;

      return new Promise(function (resolve) {
        var path = _this2.path("test.txt");
        Nullchan.cmd("fileWrite", [path, btoa("fuck this")], function (write) {
          Nullchan.cmd("siteSign", { inner_path: path }, function (basicResponse) {
            Nullchan.cmd("fileGet", _this2.path("content.json"), function (contentJson) {
              resolve(contentJson);
            });
          });
        });
      });
    }
  }, {
    key: "setOptional",
    value: function setOptional(strJson) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var path = _this3.path("content.json");
        var data = JSON.parse(strJson);
        data.optional = ".*\\.(png|jpg|gif)";
        var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));

        Nullchan.cmd("fileWrite", [path, btoa(json_raw)], function (write) {
          if (write != "ok") {
            alert(JSON.stringify(write));
            alert("Sorry, still testing this one");
          }
          Nullchan.cmd("siteSign", { inner_path: path }, function (signResponse) {
            _this3.optionalOK = true;
            resolve();
          });
        });
      });
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(rawBase64, fileName, publish) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.checkIfOptionalOK().then(function () {
          var path = _this4.path(fileName);
          Nullchan.cmd("fileWrite", [path, rawBase64], function (write) {
            if (write == "ok") {
              if (publish == false) {
                resolve(path);
              } else {
                Nullchan.cmd("sitePublish", { "inner_path": path }, function (publish) {
                  if (publish == "ok") {
                    resolve(path);
                  } else {
                    reject(publish);
                  }
                });
              }
            } else {
              reject(write);
            }
          });
        });
      });
    }
  }, {
    key: "uploadPost",
    value: function uploadPost(formData) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        Nullchan.cmd("fileGet", { inner_path: _this5.path("data.json"), required: false }, function (data) {
          if (!!data) {
            try {
              data = JSON.parse(data);
            } catch (err) {
              data = { message: [] };
            }
          } else {
            data = { message: [] };
          }

          formData.hashsum = md5(JSON.stringify(formData));
          formData.board = Nullchan.currentBoard.key;
          data.message.push(formData);
          var json = unescape(encodeURIComponent(JSON.stringify(data, undefined, '  ')));

          _this5.uploadFile(btoa(json), "data.json", true).then(function () {
            resolve(formData);
          }).catch(function (err) {
            reject(err);
          });
        });
      });
    }
  }]);

  return Files;
}();

window.Files = new Files();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Images = function () {
  function Images() {
    _classCallCheck(this, Images);
  }

  _createClass(Images, null, [{
    key: "process",
    value: function process(formData) {
      return new Promise(function (resolve) {
        if (!!!formData.file) {
          delete formData.file;
          return resolve(formData);
        }

        var image = document.createElement("img");
        var reader = new FileReader();

        reader.onload = function (event) {
          image.src = event.target.result;
        };
        image.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0, image.width, image.height);
          var imageFull = canvas.toDataURL("image/jpeg", 1).split(',')[1];
          var maxWidth = 200;
          var maxHeight = 200;
          var width = image.width;
          var height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          var imageThumb = canvas.toDataURL("image/jpeg", 1).split(',')[1];
          var hash = md5(imageFull);

          Files.uploadFile(imageFull, hash + ".jpg", false).then(function (fullPath) {
            Files.uploadFile(imageThumb, hash + "-thumb.jpg", false).then(function (thumbPath) {
              formData.file_thumb = thumbPath;
              formData.file_full = fullPath;
              delete formData.file;
              resolve(formData);
            });
          });
        };
        reader.readAsDataURL(formData.file);
      });
    }
  }]);

  return Images;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Markup = function () {
  function Markup() {
    _classCallCheck(this, Markup);

    this.entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;'
    };

    // "/": '&#x2F;',
    this.expressions = [
    // reflinks
    [/&gt;&gt;(\w+)/mg, function (match, content) {
      var post = Threads.shortMap[content];
      if (!!!post) {
        return match;
      }

      var parent = post.parent || post.hashsum;
      var url = Helpers.fixLink("/0chan.bit/?/" + post.board + "/thread/" + parent + "/" + content);
      return "<a class=\"reflink\" href=\"" + url + "\">&gt;&gt;" + content + "</a>";
    }],

    // quote
    [/^\s*&gt;\s{0,1}(.+?)$/mg, function (match, content) {
      var br = "";
      if (match[0] == "\n") {
        br = "<br />";
      }
      return br + ("<em class='quote'>&gt; " + content + "</em>");
    }],

    // bold
    [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>'],

    // italic
    [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>'],

    // underline
    [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3'],

    // strike
    [/\^([\s\S]+?)\^/mg, function (match, text) {
      if (text.match(/^_+$/)) {
        return match;
      }
      return "<em class='strike'>" + text + "</em>";
    }],

    // spoiler
    [/%%([\s\S]+?)%%/mg, '<em class="spoiler">$1</em>'],

    // line breaks
    [/\r?\n/mg, "\n"], [/\n/mg, "<br/>"], [/(<br\/>){2,}/mg, "<br/><br/>"]];
  }

  _createClass(Markup, [{
    key: "render",
    value: function render(content) {
      content = this.escapeHTML(content).trim();
      content = content.replace(URL_REGEXP, function (match, text) {
        if (match.includes('@') || !match.startsWith("http")) {
          return match;
        }
        var link = match;
        if (link.length > 50) {
          link = link.substring(0, 50) + "...";
        }
        link = link.replace("&amp;", "&");
        match = match.replace("&amp;", "&");
        return "<a href='" + match + "' target='_parent' data-no-push='true'>" + link + "</a>";
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.expressions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var exp = _step.value;

          content = content.replace(exp[0], exp[1]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return content;
    }
  }, {
    key: "escapeHTML",
    value: function escapeHTML(raw) {
      var _this = this;

      return String(raw.trim()).replace(/[&<>"']/g, function (s) {
        return _this.entityMap[s];
      });
    }
  }]);

  return Markup;
}();

window.Markup = new Markup();
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SeenCount = function () {
  function SeenCount() {
    _classCallCheck(this, SeenCount);
  }

  _createClass(SeenCount, [{
    key: "getActualCounter",
    value: function getActualCounter() {
      var _this = this;

      return new Promise(function (resolve) {
        if (!!_this.actualCounter) {
          resolve(_this.actualCounter);
        } else {
          _this.updateActualCounter().then(function () {
            resolve(_this.actualCounter);
          });
        }
      });
    }
  }, {
    key: "updateActualCounter",
    value: function updateActualCounter() {
      var _this2 = this;

      return new Promise(function (resolve) {
        Database.getMessageCountByBoard().then(function (counter) {
          _this2._actualCounter = counter;
          resolve();
        });
      });
    }
  }, {
    key: "setLocalCounter",
    value: function setLocalCounter(boardKey) {
      var forcePlusOne = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      Promise.all([this.getActualCounter(), this.getLocalCounter()]).then(function (data) {
        var _data = _slicedToArray(data, 2);

        var actual = _data[0];
        var local = _data[1];

        var storage = {};
        local[boardKey] = actual[boardKey];

        if (forcePlusOne) {
          local[boardKey] = local[boardKey] + 1;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Boards.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var board = _step.value;

            storage["msg_" + board.key] = local[board.key] || 0;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        Nullchan.cmd("wrapperSetLocalStorage", storage);
      });
    }
  }, {
    key: "getLocalCounter",
    value: function getLocalCounter() {
      return new Promise(function (resolve) {
        Nullchan.cmd("wrapperGetLocalStorage", [], function (response) {
          if (!!!response) {
            response = {};
          }
          var result = {};

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Boards.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var board = _step2.value;

              result[board.key] = response["msg_" + board.key] || 0;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "getUnread",
    value: function getUnread() {
      var _this3 = this;

      return new Promise(function (resolve) {
        Promise.all([_this3.getActualCounter(), _this3.getLocalCounter()]).then(function (data) {
          var _data2 = _slicedToArray(data, 2);

          var actual = _data2[0];
          var local = _data2[1];

          var result = {};
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = Boards.list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var board = _step3.value;

              if (local[board.key] > 0) {
                result[board.key] = actual[board.key] - local[board.key];
              } else {
                result[board.key] = 0;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "actualCounter",
    get: function get() {
      return this._actualCounter;
    }
  }]);

  return SeenCount;
}();

window.SeenCount = new SeenCount();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Threads = function () {
  _createClass(Threads, [{
    key: "cachedPosts",
    get: function get() {
      return this._cachedPosts;
    }
  }, {
    key: "shortMap",
    get: function get() {
      return this._shortMap;
    }
  }, {
    key: "lastPostTime",
    get: function get() {
      if (!this._lastPost) {
        return "N/A";
      }
      return Helpers.timeSince(this._lastPost.created_at);
    }
  }]);

  function Threads() {
    _classCallCheck(this, Threads);

    this._shortMap = {};
    this._cachedPosts = {};
  }

  _createClass(Threads, [{
    key: "updateLastPost",
    value: function updateLastPost() {
      var _this = this;

      return new Promise(function (resolve) {
        Database.getLastPost().then(function (post) {
          _this._lastPost = post;
          resolve();
        });
      });
    }
  }, {
    key: "loadSingle",
    value: function loadSingle(threadHash) {
      var _this2 = this;

      return new Promise(function (resolve) {
        Database.loadSingleThread(Nullchan.currentBoard.key, threadHash).then(function (messages) {
          resolve(_this2.buildThreads(messages));
        });
      });
    }
  }, {
    key: "buildThreads",
    value: function buildThreads(messages) {
      var posts = {};
      var threads = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var post = _step.value;

          this._shortMap[post.hashsum.substring(22, 32)] = post;
          var threadHash = post.parent || post.hashsum;
          if (!!!posts[threadHash]) {
            posts[threadHash] = { opening: null, replies: [] };
          }
          if (post.parent == null) {
            posts[threadHash].opening = post;
          } else {
            posts[threadHash].replies.push(post);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._cachedPosts = posts;
      for (var hash in this.cachedPosts) {
        var post = this.cachedPosts[hash];
        if (!!!post.opening) {
          continue;
        }
        threads.push([post.opening].concat(post.replies.sort(this.sortPosts)));
      }

      return threads.sort(this.sortThreads);
    }
  }, {
    key: "loadAll",
    value: function loadAll() {
      var _this3 = this;

      return new Promise(function (resolve) {
        Database.loadMessagesOnBoard(Nullchan.currentBoard.key).then(function (messages) {
          resolve(_this3.buildThreads(messages));
        });
      });
    }
  }, {
    key: "appendPost",
    value: function appendPost(newPost) {
      this._shortMap[newPost.hashsum.substring(22, 32)] = newPost;
      var parentHash = newPost.parent || newPost.hashsum;
      if (!!this.cachedPosts[parentHash]) {
        this._cachedPosts[parentHash].replies.push(newPost);
        if (!!View.rBoardPage.threadMap[parentHash]) {
          var thread = this._cachedPosts[parentHash];
          var posts = [thread.opening].concat(thread.replies.sort(this.sortPosts));

          View.rBoardPage.threadMap[parentHash].setState({ posts: posts });
        }
      }
    }
  }, {
    key: "sortPosts",
    value: function sortPosts(a, b) {
      if (a.created_at > b.created_at) {
        return 1;
      }
      return -1;
    }
  }, {
    key: "sortThreads",
    value: function sortThreads(a, b) {
      if (a[a.length - 1].created_at > b[b.length - 1].created_at) {
        return -1;
      }
      return 1;
    }
  }]);

  return Threads;
}();

window.Threads = new Threads();
"use strict";

var URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((\:\d+)?(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_\#\/\?\*\:]*))?)/mg;
"use strict";

var VERSION = "0.2.0";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  _createClass(View, [{
    key: "container",
    get: function get() {
      return this._container;
    }
  }, {
    key: "header",
    get: function get() {
      return this._header;
    }
  }, {
    key: "preloader",
    get: function get() {
      return this._preloader;
    }
  }]);

  function View() {
    _classCallCheck(this, View);

    var _arr = ["container", "header", "preloader"];

    for (var _i = 0; _i < _arr.length; _i++) {
      var name = _arr[_i];
      this["_" + name] = document.getElementById(name);
    }
  }

  _createClass(View, [{
    key: "showPreloader",
    value: function showPreloader() {
      var _this = this;

      this.preloader.className = "";
      this.container.style.display = "none";
      setTimeout(function () {
        _this.preloader.className = "shown";
      }, 1000);
    }
  }, {
    key: "hidePreloader",
    value: function hidePreloader() {
      var _this2 = this;

      this.preloader.className = "";
      this.preloader.style.display = "none";
      this.container.style.display = "block";
      this.container.className = "fadein";
      setTimeout(function () {
        _this2.container.className = "";
      }, 1000);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(siteInfo) {
      this.rHeader = ReactDOM.render(React.createElement(Header, { siteInfo: Nullchan.siteInfo, board: {} }), this.header);
    }
  }, {
    key: "updateHeader",
    value: function updateHeader() {
      if (Nullchan.currentPage != "main") {
        this.header.className = "with-border";
      } else {
        this.header.className = "";
      }

      if (!!Nullchan.currentBoard && !!this.rHeader) {
        this.rHeader.setState({ board: Nullchan.currentBoard });
      }
    }
  }, {
    key: "renderMainPage",
    value: function renderMainPage() {
      var _this3 = this;

      Threads.updateLastPost().then(function () {
        _this3.rMainPage = ReactDOM.render(React.createElement(MainPage, {
          boards: Boards.list,
          siteInfo: Nullchan.siteInfo,
          lastPostTime: Threads.lastPostTime
        }), _this3.container);

        _this3.hidePreloader();
      });
    }
  }, {
    key: "renderBoard",
    value: function renderBoard() {
      var _this4 = this;

      var threadHash = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var promise;
      if (threadHash == null) {
        promise = Threads.loadAll();
      } else {
        promise = Threads.loadSingle(threadHash);
      }

      promise.then(function (threads) {
        console.log(threads);
        _this4.rBoardPage = ReactDOM.render(React.createElement(BoardPage, { formShown: false, threads: threads }), _this4.container);
        _this4.hidePreloader();
        if (Nullchan.currentPage == "list") {
          SeenCount.setLocalCounter(Nullchan.currentBoard.key);
        }
      });
    }
  }, {
    key: "renderNotFound",
    value: function renderNotFound() {
      ReactDOM.render(React.createElement(NotFound, null), this.container);
      this.hidePreloader();
    }
  }, {
    key: "updateSiteInfo",
    value: function updateSiteInfo(newInfo) {
      var _this5 = this;

      if (!!this.rHeader) {
        this.rHeader.setState({ siteInfo: newInfo });
      }

      if (!!this.rMainPage) {
        Threads.updateLastPost().then(function () {
          _this5.rMainPage.setState({
            lastPostTime: Threads.lastPostTime,
            siteInfo: newInfo
          });
        });
      }

      if (!!this.rAuthForm) {
        this.rAuthForm.setState({ userName: Nullchan.shortUserName() });
      }
    }
  }]);

  return View;
}();

window.View = new View();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nullchan = function (_ZeroFrame) {
  _inherits(Nullchan, _ZeroFrame);

  function Nullchan() {
    _classCallCheck(this, Nullchan);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Nullchan).apply(this, arguments));
  }

  _createClass(Nullchan, [{
    key: "init",
    value: function init() {
      this.grepPath();
      this.siteInfoUpdatedAt = 0;
      this.currentPage = null;
      View.showPreloader();
    }
  }, {
    key: "reloadSiteInfo",
    value: function reloadSiteInfo() {
      var _this2 = this;

      setTimeout(this.reloadSiteInfo.bind(this), 15000);
      if (Helpers.unixTimestamp("now") - this.siteInfoUpdatedAt < 30) {
        return;
      }
      this.cmd("siteInfo", {}, function (newInfo) {
        _this2.updateSiteInfo(newInfo);
      });
    }
  }, {
    key: "onOpenWebsocket",
    value: function onOpenWebsocket() {
      var _this3 = this;

      this.cmd("siteInfo", {}, function (newInfo) {
        _this3.updateSiteInfo(newInfo);
        if (_this3.currentPage == null) {
          View.renderHeader();
          _this3.determineRoute();
        }
        _this3.reloadSiteInfo();
      });
    }
  }, {
    key: "onRequest",
    value: function onRequest(cmd, message) {
      if (cmd == "setSiteInfo") {
        this.updateSiteInfo(message);
      }
    }
  }, {
    key: "updateSiteInfo",
    value: function updateSiteInfo(newInfo) {
      this.siteInfo = newInfo.params || newInfo;
      this.siteInfoUpdatedAt = Helpers.unixTimestamp("now");
      View.updateSiteInfo(this.siteInfo);
    }
  }, {
    key: "determineRoute",
    value: function determineRoute() {
      var _this4 = this;

      Boards.reload().then(function () {
        if (_this4.currentPath.length == 0) {
          _this4.currentPage = "main";
          View.renderMainPage();
        } else {
          var board = Boards.getByKey(_this4.currentPath[0]);
          if (board != null) {
            _this4.currentBoard = board;
            if (_this4.currentPath.length == 1) {
              _this4.currentPage = "list";
              View.renderBoard();
            } else if (_this4.currentPath[1] == "thread") {
              _this4.currentPage = "thread";
              View.renderBoard(_this4.currentPath[2]);
            }
          }
        }
        View.updateHeader();
        if (!!!_this4.currentPage) {
          View.renderNotFound();
        }
      });
    }
  }, {
    key: "shortUserName",
    value: function shortUserName() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (!name) {
        name = this.siteInfo.cert_user_id;
      }
      if (name == "sthetz@zeroid.bit") {
        return "[dev] sthetz";
      }
      if (!name) {
        return name;
      }
      return name.split("@")[0];
    }
  }, {
    key: "grepPath",
    value: function grepPath() {
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = window.location.search.substring(1).split("/")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          if (part.includes("wrapper_nonce")) {
            part = part.split("wrapper_nonce")[0];
          }
          part = part.trim();
          if (part[part.length - 1] == "&") {
            part = part.substring(0, part.length - 1);
          }
          if (part == "" || part == "&") {
            continue;
          }
          result.push(part);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._currentPath = result;
    }
  }, {
    key: "currentPath",
    get: function get() {
      return this._currentPath;
    }
  }, {
    key: "currentPage",
    get: function get() {
      return this._currentPage;
    },
    set: function set(page) {
      this._currentPage = page;
    }
  }, {
    key: "currentBoard",
    get: function get() {
      return this._currentBoard;
    },
    set: function set(board) {
      this._currentBoard = board;
    }
  }, {
    key: "siteInfo",
    get: function get() {
      return this._siteInfo;
    },
    set: function set(info) {
      this._siteInfo = info;
    }
  }]);

  return Nullchan;
}(ZeroFrame);

window.Nullchan = new Nullchan();
